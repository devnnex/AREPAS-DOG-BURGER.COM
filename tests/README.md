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

Las pruebas abren un servidor local temporal y usan respuestas simuladas para Apps Script y Supabase: no modifican productos reales ni suben archivos al proyecto remoto. Verifican creación, edición, eliminación, extras, compresión, reintentos, restauración de imágenes, caché, diseño móvil y bloqueo del scroll. La migración SQL se ejecuta dos veces en PostgreSQL local (PGlite) para comprobar las políticas de acceso con usuarios anónimos, usuarios sin permiso y administradores autorizados.

La verificación de una subida real requiere activar primero el almacenamiento siguiendo `supabase/README.md`.
