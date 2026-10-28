// Set PRODUCT_IMAGE_ADMIN_PASSWORD to the SAME password as the current admin panel.
// No second sign-in or Supabase Auth account is needed.
export function createUploadHandler({ getEnv = name => Deno.env.get(name), fetchImpl = fetch } = {}) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store"
  };
  const reply = (body, status = 200) => Response.json(body, { status, headers: cors });
  const maxFile = 2 * 1024 * 1024;

  async function readForm(request) {
    const limit = maxFile + 65536;
    if (Number(request.headers.get("content-length")) > limit) throw new Error("too-large");
    const reader = request.body?.getReader();
    if (!reader) throw new Error("empty");
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { await reader.cancel(); throw new Error("too-large"); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return new Response(bytes, { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData();
  }

  async function samePassword(candidate, expected) {
    if (typeof candidate !== "string" || candidate.length > 4096) return false;
    const encoder = new TextEncoder();
    const hashes = await Promise.all([candidate, expected].map(text => crypto.subtle.digest("SHA-256", encoder.encode(text))));
    const a = new Uint8Array(hashes[0]), b = new Uint8Array(hashes[1]);
    let difference = 0;
    for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
    return difference === 0;
  }

  return async request => {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
    const password = getEnv("PRODUCT_IMAGE_ADMIN_PASSWORD");
    const serviceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
    const base = getEnv("SUPABASE_URL")?.replace(/\/$/, "");
    if (!password || !serviceKey || !base) return reply({ error: "Image uploads are not configured" }, 503);
    try {
      const form = await readForm(request);
      if (!await samePassword(form.get("password"), password)) return reply({ error: "Unauthorized" }, 401);
      const file = form.get("file"), objectPath = form.get("path");
      if (!(file instanceof Blob) || !file.size || file.size > maxFile) return reply({ error: "Invalid image size" }, 400);
      const extension = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg" }[file.type];
      if (!extension || typeof objectPath !== "string" || !/^products\/[0-9a-f-]{36}\.(webp|png|jpg)$/.test(objectPath)
        || !objectPath.endsWith(`.${extension}`)) return reply({ error: "Invalid image" }, 400);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const header = new TextDecoder().decode(bytes.slice(0, 12));
      const valid = extension === "webp" ? header.startsWith("RIFF") && header.slice(8, 12) === "WEBP"
        : extension === "png" ? bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71
        : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      if (!valid) return reply({ error: "Invalid image contents" }, 400);

      const uploaded = await fetchImpl(`${base}/storage/v1/object/product-images/${objectPath}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey, "Content-Type": file.type,
          "cache-control": "public, max-age=31536000, immutable", "x-upsert": "false" },
        body: bytes, signal: AbortSignal.timeout(30000)
      });
      if (!uploaded.ok) {
        const error = await uploaded.json().catch(() => ({}));
        // A retry after a lost response reuses the existing immutable URL.
        if (uploaded.status !== 409 && String(error.statusCode) !== "409" && error.error !== "Duplicate") {
          return reply({ error: "Could not save image" }, 502);
        }
      }
      return reply({ url: `${base}/storage/v1/object/public/product-images/${objectPath}` });
    } catch (error) {
      return reply({ error: error.message === "too-large" ? "Image too large" : "Could not save image" }, error.message === "too-large" ? 413 : 400);
    }
  };
}

if (typeof Deno !== "undefined") Deno.serve(createUploadHandler());
