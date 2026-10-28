# Verificación de imágenes

La web sigue siendo HTML/CSS/JS estático y no necesita compilación. Estas pruebas son solo para desarrollo.

Requisitos: Node.js 22, `playwright-core`, `@electric-sql/pglite` y Chrome/Chromium instalado. Se pueden instalar las dependencias de prueba en una carpeta externa al sitio con `npm install --no-save playwright-core @electric-sql/pglite`.

Ejemplo en PowerShell desde la raíz del proyecto:

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\ruta\node_modules\playwright-core'
$env:PGLITE_MODULE = 'C:\ruta\node_modules\@electric-sql\pglite'
$env:BROWSER_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node --test tests/*.test.cjs
```

Las pruebas abren un servidor local temporal y usan respuestas simuladas para Apps Script y Storage: no modifican productos reales ni suben archivos al proyecto remoto. El navegador ejecuta el código real de la función de subida, con Storage simulado, para verificar que reutiliza la contraseña actual sin mostrar un segundo acceso. Se comprueban creación, edición, eliminación, extras, compresión, reintentos, eliminación y reemplazo de fotos locales y subidas, caché, diseño móvil y bloqueo del scroll.

La migración SQL se ejecuta dos veces en PostgreSQL local (PGlite) para comprobar que bloquea escrituras directas desde el navegador y permite las del servidor. Las pruebas de la función verifican la contraseña, el tamaño, el formato, las rutas y los errores sin divulgar claves privadas.

La verificación de una subida real requiere activar primero el almacenamiento siguiendo `supabase/README.md`.
