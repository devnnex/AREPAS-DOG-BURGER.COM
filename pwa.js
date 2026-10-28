if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./", updateViaCache: "none" })
      .catch(error => console.warn("No se pudo preparar el acceso desde la pantalla de inicio.", error));
  });
}
