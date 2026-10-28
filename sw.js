const CACHE = "adb-shell-20261027-4";
const ASSETS = ["./", "./index.html", "./style.css?v=20261027.4", "./storefront.css?v=20261027.4",
  "./product-images.js?v=20261027.4", "./app.js?v=20261027.4", "./pwa.js?v=20261027.4",
  "./manifest.json?v=20261027.4", "./images/logo.png", "./images/favicon.png",
  "./images/app-icon-192.png", "./images/app-icon-512.png", "./images/app-icon-maskable-512.png",
  "./images/apple-touch-icon.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("adb-shell-") && key !== CACHE)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);
  // Never intercept uploads, admin requests, external APIs, or repository files.
  if (request.method !== "GET" || url.origin !== self.location.origin
    || !["document", "script", "style", "image", "manifest"].includes(request.destination)
    || /\/(supabase|tests)\//.test(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // Prefer the server so installing the app cannot freeze an old menu or UI.
      const response = await fetch(request, { cache: "no-cache" });
      if (response.ok) {
        try {
          await cache.put(request, response.clone());
          const keys = await cache.keys();
          if (keys.length > 120) await cache.delete(keys.find(key => !ASSETS.some(asset => new URL(asset, self.registration.scope).href === key.url)));
        } catch { /* A full cache must never replace a fresh network response. */ }
      }
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === "navigate") {
        const shell = await cache.match(new URL("./index.html", self.registration.scope));
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
