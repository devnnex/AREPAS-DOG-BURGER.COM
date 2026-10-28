/* Public browser configuration. Upload permissions are enforced by Supabase RLS. */
window.ProductImages = (() => {
  const URL_BASE = "https://pnubnimuizpgprtkbcwk.supabase.co";
  const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudWJuaW11aXpwZ3BydGtiY3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNDg4ODgsImV4cCI6MjEwODcyNDg4OH0.eCYceUUXDqKMGfdToeC541cc8-8UBYH9xrtYhRRfqbg";
  const BUCKET = "product-images";
  const MAX_INPUT = 12 * 1024 * 1024;
  const MAX_OUTPUT = 2 * 1024 * 1024;
  let ui, session, pending, previewUrl, original = "", generation = 0;
  let processing = false, uploading = false, connecting = false, authRequest;

  function init() {
    const byId = id => document.getElementById(id);
    ui = {
      form: byId("product-form"), picker: byId("product-image-picker"),
      file: byId("product-image-file"), choose: byId("product-image-choose"),
      preview: byId("product-image-preview"), empty: byId("product-image-empty"),
      name: byId("product-image-name"), status: byId("product-image-status"),
      progress: byId("product-image-progress"), restore: byId("product-image-restore"),
      connect: byId("image-storage-connect"), dialog: byId("image-auth-dialog"),
      authForm: byId("image-auth-form"), authError: byId("image-auth-error")
    };
    [ui.choose, byId("product-image-browse")].forEach(button => button.addEventListener("click", () => ui.file.click()));
    ui.file.addEventListener("change", () => selectFile(ui.file.files[0]));
    ui.restore.addEventListener("click", () => {
      reset(original);
      ui.form.elements.imagen.value = "";
      status("Imagen original restaurada. Guarda el producto para aplicar el cambio.");
    });
    ["dragenter", "dragover", "dragleave", "drop"].forEach(type => {
      ui.choose.addEventListener(type, event => {
        event.preventDefault();
        ui.choose.classList.toggle("is-dragging", type === "dragenter" || type === "dragover");
        if (type === "drop" && !uploading) selectFile(event.dataTransfer.files[0]);
      });
    });
    ui.connect.addEventListener("click", () => ensureSession().catch(error => status(error.message, true)));
    byId("image-auth-close").addEventListener("click", cancelAuth);
    ui.dialog.addEventListener("click", event => { if (event.target === ui.dialog) cancelAuth(); });
    ui.dialog.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.stopPropagation(); cancelAuth(); }
      if (event.key === "Tab") {
        const fields = [...ui.dialog.querySelectorAll("button:not(:disabled), input")];
        const first = fields[0], last = fields[fields.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    ui.authForm.addEventListener("submit", signIn);
    reset();
  }

  function status(text, error = false) {
    ui.status.textContent = text;
    ui.status.classList.toggle("is-error", error);
  }

  function renderPreview(source) {
    ui.preview.onerror = () => {
      ui.preview.classList.add("hidden");
      ui.empty.classList.remove("hidden");
      ui.choose.classList.remove("has-image");
    };
    ui.preview.classList.toggle("hidden", !source);
    ui.empty.classList.toggle("hidden", Boolean(source));
    ui.choose.classList.toggle("has-image", Boolean(source));
    if (source) ui.preview.src = source;
    else ui.preview.removeAttribute("src");
  }

  function reset(source = "", fallback = source) {
    if (!ui) return;
    generation++;
    pending = null;
    processing = false;
    original = fallback;
    if (previewUrl) window.URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    ui.file.value = "";
    ui.name.textContent = source ? "Imagen actual del producto" : "Haz que tu producto destaque";
    ui.restore.classList.toggle("hidden", !source);
    ui.progress.classList.add("hidden");
    status("La imagen se guarda al guardar el producto.");
    renderPreview(source);
  }

  async function selectFile(file) {
    if (!file || uploading || ui.form.inert) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      status("Selecciona una imagen JPG, PNG o WebP.", true);
      ui.file.value = "";
      return;
    }
    if (file.size > MAX_INPUT) {
      status("La imagen supera los 12 MB. Elige una más pequeña.", true);
      ui.file.value = "";
      return;
    }
    const version = ++generation;
    processing = true;
    pending = null;
    status("Preparando una versión ligera de tu foto…");
    const source = window.URL.createObjectURL(file);
    if (previewUrl) window.URL.revokeObjectURL(previewUrl);
    previewUrl = source;
    renderPreview(source);
    ui.name.textContent = file.name;
    ui.restore.classList.remove("hidden");
    try {
      const image = new Image();
      image.src = source;
      await image.decode();
      if (version !== generation) return;
      const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      let blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.84));
      if (!blob) throw new Error("No se pudo procesar esta foto. Prueba con otra imagen.");
      if (blob.size > MAX_OUTPUT) blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.65));
      if (!blob || blob.size > MAX_OUTPUT) throw new Error("La imagen sigue siendo muy pesada. Prueba una foto de menor tamaño.");
      if (version !== generation) return;
      pending = { blob, path: `products/${crypto.randomUUID()}.${blob.type === "image/webp" ? "webp" : "png"}` };
      const reduction = Math.max(0, Math.round((1 - blob.size / file.size) * 100));
      status(`Lista para guardar · ${Math.ceil(blob.size / 1024)} KB${reduction ? ` · ${reduction}% menos peso` : ""}`);
    } catch (error) {
      if (version !== generation) return;
      renderPreview(ui.form.elements.imagen.value || original);
      status(error.message || "No se pudo abrir esta imagen.", true);
    } finally {
      if (version === generation) processing = false;
    }
  }

  async function authFetch(path, body, token = ANON_KEY) {
    const response = await fetch(`${URL_BASE}/auth/v1/${path}`, {
      method: "POST", headers: { apikey: ANON_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body), signal: AbortSignal.timeout(20000)
    });
    const data = await response.json();
    if (!response.ok) throw new Error("No se pudo conectar. Revisa el correo y la contraseña de imágenes.");
    return { ...data, expiresAt: Date.now() + data.expires_in * 1000 };
  }

  async function ensureSession() {
    if (session && session.expiresAt > Date.now() + 60000) return session;
    if (session?.refresh_token) {
      try {
        session = await authFetch("token?grant_type=refresh_token", { refresh_token: session.refresh_token });
        return session;
      } catch { session = null; }
    }
    if (authRequest) return authRequest.promise;
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    authRequest = { promise, resolve, reject, focus: document.activeElement };
    ui.authError.textContent = "";
    ui.dialog.classList.remove("hidden");
    ui.dialog.setAttribute("aria-hidden", "false");
    ui.authForm.elements.email.focus();
    return promise;
  }

  function closeAuth() {
    const focus = authRequest?.focus;
    ui.dialog.classList.add("hidden");
    ui.dialog.setAttribute("aria-hidden", "true");
    ui.authForm.elements.password.value = "";
    authRequest = null;
    focus?.focus();
  }

  function cancelAuth() {
    if (connecting) return;
    authRequest?.reject(new Error("Conexión cancelada. Tu foto sigue lista para guardar."));
    closeAuth();
  }

  async function signIn(event) {
    event.preventDefault();
    if (connecting) return;
    connecting = true;
    const button = ui.authForm.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Conectando…";
    ui.authError.textContent = "";
    const request = authRequest;
    try {
      const result = await authFetch("token?grant_type=password", {
        email: ui.authForm.elements.email.value.trim(), password: ui.authForm.elements.password.value
      });
      if (request !== authRequest) return;
      session = result;
      ui.connect.textContent = "Almacenamiento conectado ✓";
      authRequest?.resolve(session);
      closeAuth();
    } catch (error) {
      if (request === authRequest) ui.authError.textContent = error.message;
    } finally {
      connecting = false;
      button.disabled = false;
      button.textContent = "Conectar y continuar";
    }
  }

  async function uploadPending() {
    if (processing) throw new Error("La foto se está optimizando. Espera un momento y vuelve a guardar.");
    if (!pending) return ui.form.elements.imagen.value;
    const file = pending;
    const auth = await ensureSession();
    uploading = true;
    ui.progress.value = 0;
    ui.progress.classList.remove("hidden");
    status("Subiendo imagen…");
    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${URL_BASE}/storage/v1/object/${BUCKET}/${file.path}`);
        xhr.timeout = 45000;
        xhr.setRequestHeader("apikey", ANON_KEY);
        xhr.setRequestHeader("Authorization", `Bearer ${auth.access_token}`);
        xhr.setRequestHeader("Content-Type", file.blob.type);
        xhr.setRequestHeader("cache-control", "public, max-age=31536000, immutable");
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) ui.progress.value = Math.round(event.loaded / event.total * 100);
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) return resolve();
          if (xhr.status === 401) { session = null; ui.connect.textContent = "Reconectar almacenamiento"; }
          reject(new Error(xhr.status === 401 ? "La sesión de imágenes expiró. Vuelve a guardar para conectarte."
            : "No se pudo subir la foto. Comprueba que el almacenamiento esté creado y tu usuario tenga permiso."));
        };
        xhr.onerror = xhr.ontimeout = () => reject(new Error("No se pudo subir la imagen. Revisa tu conexión e inténtalo de nuevo."));
        xhr.send(file.blob);
      });
      const publicUrl = `${URL_BASE}/storage/v1/object/public/${BUCKET}/${file.path}`;
      ui.form.elements.imagen.value = publicUrl;
      pending = null;
      ui.progress.value = 100;
      status("Imagen subida. Guardando el producto…");
      return publicUrl;
    } catch (error) {
      status(error.message, true);
      throw error;
    } finally { uploading = false; }
  }

  function clearSession() {
    session = null;
    if (ui) {
      authRequest?.reject(new Error("Sesión de imágenes cerrada."));
      closeAuth();
      ui.authForm.reset();
      ui.connect.textContent = "Conectar almacenamiento";
    }
  }

  return { init, reset, uploadPending, clearSession };
})();
