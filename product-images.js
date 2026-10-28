/* Public configuration. The server function validates the existing admin access. */
window.ProductImages = (() => {
  const URL_BASE = "https://pnubnimuizpgprtkbcwk.supabase.co";
  const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudWJuaW11aXpwZ3BydGtiY3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNDg4ODgsImV4cCI6MjEwODcyNDg4OH0.eCYceUUXDqKMGfdToeC541cc8-8UBYH9xrtYhRRfqbg";
  // Empty values retain legacy default photos; this value explicitly opts out.
  const NO_IMAGE = "__no_image__";
  const MAX_INPUT = 32 * 1024 * 1024;
  const MAX_OUTPUT = 2 * 1024 * 1024;
  let ui, pending, previewUrl, original = "", generation = 0;
  let processing = false, uploading = false;
  let selectionError = "";
  const decoderLoads = new Map();

  function loadDecoder(path, ready) {
    if (ready()) return Promise.resolve();
    if (!decoderLoads.has(path)) {
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const timer = setTimeout(() => fail(), 30000);
        function fail() {
          clearTimeout(timer);
          script.remove();
          decoderLoads.delete(path);
          reject(new Error("No se pudo preparar esta foto. Revisa tu conexión e inténtalo de nuevo."));
        }
        script.onload = () => {
          clearTimeout(timer);
          if (ready()) resolve();
          else fail();
        };
        script.onerror = fail;
        script.src = new URL(path, document.baseURI).href;
        document.head.append(script);
      });
      decoderLoads.set(path, promise);
    }
    return decoderLoads.get(path);
  }

  async function openPhoto(file, source) {
    const image = new Image();
    image.src = source;
    try {
      await image.decode();
      return image;
    } catch { /* Some phone and camera formats need a local decoder. */ }
    const bytes = new Uint8Array(await file.slice(0, 64).arrayBuffer());
    const header = new TextDecoder().decode(bytes);
    if (/\.(heic|heif|hif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type)
      || (header.slice(4, 8) === "ftyp" && /heic|heix|hevc|hevx|heim|heis|mif1|msf1/.test(header))) {
      await loadDecoder("vendor/heic-to-1.6.7.js", () => typeof window.HeicTo === "function");
      return window.HeicTo({ blob: file, type: "bitmap" });
    }
    if (/\.(tiff?|dng|cr2|nef)$/i.test(file.name) || /image\/tiff/i.test(file.type)
      || (bytes[0] === 73 && bytes[1] === 73 && bytes[2] === 42)
      || (bytes[0] === 77 && bytes[1] === 77 && bytes[3] === 42)) {
      await loadDecoder("vendor/pako-inflate-1.0.11.js", () => Boolean(window.pako));
      await loadDecoder("vendor/utif-3.1.0.js", () => Boolean(window.UTIF));
      const buffer = await file.arrayBuffer();
      const frames = window.UTIF.decode(buffer);
      const frame = frames.find(item => item.t256 && item.t257);
      if (!frame || Number(frame.t256[0]) * Number(frame.t257[0]) > 80000000) throw new Error("No se pudo abrir esa foto. Prueba otra copia del archivo.");
      window.UTIF.decodeImage(buffer, frame);
      const canvas = document.createElement("canvas");
      canvas.width = frame.width;
      canvas.height = frame.height;
      canvas.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(window.UTIF.toRGBA8(frame)), frame.width, frame.height), 0, 0);
      return canvas;
    }
    throw new Error("No se pudo abrir esa foto. Comprueba que el archivo sea una imagen válida.");
  }

  function init() {
    const byId = id => document.getElementById(id);
    ui = {
      form: byId("product-form"), picker: byId("product-image-picker"),
      file: byId("product-image-file"), choose: byId("product-image-choose"),
      preview: byId("product-image-preview"), empty: byId("product-image-empty"),
      name: byId("product-image-name"), status: byId("product-image-status"),
      progress: byId("product-image-progress"), remove: byId("product-image-remove"),
      browse: byId("product-image-browse")
    };
    [ui.choose, ui.browse].forEach(button => button.addEventListener("click", () => ui.file.click()));
    ui.file.addEventListener("change", () => selectFile(ui.file.files[0]));
    ui.remove.addEventListener("click", () => {
      reset();
      ui.form.elements.imagen.value = NO_IMAGE;
      ui.name.textContent = "Producto sin foto";
      status("Foto eliminada. Guarda el producto para aplicar el cambio.");
    });
    ["dragenter", "dragover", "dragleave", "drop"].forEach(type => {
      ui.choose.addEventListener(type, event => {
        event.preventDefault();
        ui.choose.classList.toggle("is-dragging", type === "dragenter" || type === "dragover");
        if (type === "drop" && !uploading) selectFile(event.dataTransfer.files[0]);
      });
    });
    reset();
  }

  function status(text, error = false) {
    ui.status.textContent = text;
    ui.status.classList.toggle("is-error", error);
  }

  function renderPreview(source) {
    ui.browse.textContent = source ? "Reemplazar foto" : "Elegir foto";
    ui.remove.classList.toggle("hidden", !source);
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

  function reset(source = "") {
    if (!ui) return;
    generation++;
    pending = null;
    processing = false;
    selectionError = "";
    original = source;
    if (previewUrl) window.URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    ui.file.value = "";
    ui.name.textContent = source ? "Imagen actual del producto" : "Elige una foto para este producto";
    ui.progress.classList.add("hidden");
    status("La imagen se guarda al guardar el producto.");
    renderPreview(source);
  }

  async function selectFile(file) {
    if (!file || uploading || ui.form.inert) return;
    if (file.size > MAX_INPUT) {
      selectionError = "La imagen supera los 32 MB. Elige una más pequeña.";
      status(selectionError, true);
      ui.file.value = "";
      return;
    }
    const version = ++generation;
    processing = true;
    pending = null;
    selectionError = "";
    status("Preparando tu foto…");
    const source = window.URL.createObjectURL(file);
    if (previewUrl) window.URL.revokeObjectURL(previewUrl);
    previewUrl = source;
    renderPreview(source);
    ui.name.textContent = file.name;
    let image;
    try {
      image = await openPhoto(file, source);
      if (version !== generation) return;
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      if (!width || !height) throw new Error("No se pudo abrir esa foto. Prueba otra copia del archivo.");
      const scale = Math.min(1, 1600 / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      let blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.84));
      if (!blob) throw new Error("No se pudo procesar esta foto. Prueba con otra imagen.");
      if (blob.size > MAX_OUTPUT) blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.65));
      if (!blob || blob.size > MAX_OUTPUT) throw new Error("La imagen sigue siendo muy pesada. Prueba una foto de menor tamaño.");
      if (version !== generation) return;
      pending = { blob, path: `products/${crypto.randomUUID()}.${blob.type === "image/webp" ? "webp" : "png"}` };
      if (previewUrl) window.URL.revokeObjectURL(previewUrl);
      previewUrl = window.URL.createObjectURL(blob);
      renderPreview(previewUrl);
      status("Lista para guardar.");
    } catch (error) {
      if (version !== generation) return;
      renderPreview(original);
      selectionError = error.message || "No se pudo abrir esta imagen.";
      status(selectionError, true);
    } finally {
      image?.close?.();
      if (version === generation) processing = false;
    }
  }

  async function uploadPending(adminPassword) {
    if (processing) throw new Error("Estamos preparando tu foto. Espera un momento y vuelve a guardar.");
    if (selectionError) throw new Error(selectionError);
    if (!pending) return ui.form.elements.imagen.value;
    const file = pending;
    if (!adminPassword) throw new Error("Ingresa al panel de administrador para guardar la foto.");
    uploading = true;
    ui.progress.value = 0;
    ui.progress.classList.remove("hidden");
    status("Subiendo imagen…");
    try {
      const publicUrl = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${URL_BASE}/functions/v1/product-images`);
        xhr.timeout = 45000;
        xhr.setRequestHeader("apikey", ANON_KEY);
        xhr.setRequestHeader("Authorization", `Bearer ${ANON_KEY}`);
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) ui.progress.value = Math.round(event.loaded / event.total * 100);
        };
        xhr.onload = () => {
          let data;
          try { data = JSON.parse(xhr.responseText); } catch { /* Show a plain error below. */ }
          const prefix = `${URL_BASE}/storage/v1/object/public/product-images/products/`;
          if (xhr.status >= 200 && xhr.status < 300 && data?.url?.startsWith(prefix)) return resolve(data.url);
          if (xhr.status === 404 || xhr.status === 503) return reject(new Error("La carga de fotos aún no está disponible. Contacta al administrador."));
          reject(new Error(xhr.status === 401 ? "No se pudo guardar la foto. Revisa el acceso de administrador."
            : "No se pudo guardar la foto. Inténtalo de nuevo; si continúa, contacta al administrador."));
        };
        xhr.onerror = xhr.ontimeout = () => reject(new Error("No se pudo subir la imagen. Revisa tu conexión e inténtalo de nuevo."));
        const body = new FormData();
        body.append("password", adminPassword);
        body.append("path", file.path);
        body.append("file", file.blob, file.path.split("/").pop());
        xhr.send(body);
      });
      ui.form.elements.imagen.value = publicUrl;
      original = publicUrl;
      pending = null;
      ui.progress.value = 100;
      status("Imagen subida. Guardando el producto…");
      return publicUrl;
    } catch (error) {
      status(error.message, true);
      throw error;
    } finally { uploading = false; }
  }

  return { init, reset, uploadPending, NO_IMAGE };
})();
