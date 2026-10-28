# Activar las imágenes de productos

El catálogo, los precios, los extras y el acceso actual siguen usando Google Apps Script. Supabase almacena únicamente las fotos. Dentro del administrador se elige, elimina o reemplaza la foto y se guarda el producto, sin otro formulario de acceso.

## Configuración inicial (una sola vez)

1. En el [SQL Editor](https://supabase.com/dashboard/project/pnubnimuizpgprtkbcwk/sql/new), ejecuta `product-images.sql`. Crea la carpeta pública `product-images` y bloquea las subidas directas desde el navegador. Si ejecutaste la versión anterior, vuelve a ejecutar este archivo actualizado.
2. En **Edge Functions → Secrets**, agrega `PRODUCT_IMAGE_ADMIN_PASSWORD` con **la misma contraseña que ya usas para entrar al panel administrativo**. No crees otra contraseña ni un usuario de imágenes. No copies este secreto al repositorio ni a la web.
3. En **Edge Functions → Deploy a new function → Via Editor**, crea una función llamada **`product-images`**. Reemplaza el contenido de `index.ts` por el de `functions/product-images/index.ts` de este repositorio y despliega. Mantén la comprobación JWT activada: la web ya envía la clave pública existente. Supabase proporciona `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` dentro de la función; esa clave privada nunca se envía al navegador.
4. Abre la web, entra con tu contraseña habitual, edita un producto, elige una foto y guarda. No se solicita ningún correo ni un segundo acceso.

Si cambias la contraseña del panel, actualiza también `PRODUCT_IMAGE_ADMIN_PASSWORD` en Supabase. El secreto se configura una vez por negocio y permite validar el acceso actual en el servidor.

Si la subida falla, los datos del producto y la imagen anterior se conservan. Si la foto se sube pero falla el guardado del producto, vuelve a guardar: se reutiliza la misma URL, sin subir la foto otra vez. **Cancelar** descarta la selección local. **Reemplazar foto** permite elegir otra imagen. **Eliminar foto** deja el producto sin imagen al guardar, incluso si tenía una foto local o predeterminada. La eliminación queda registrada en el campo `imagen` con el valor interno `__no_image__`, para que la foto predeterminada no reaparezca. No se borra el archivo original, que podría estar compartido por otros productos.

## Rendimiento y permisos

- Vista previa local inmediata; no se sube nada al seleccionar o cancelar.
- Archivos JPG, PNG o WebP de hasta 12 MB; se reducen a un máximo de 1600 píxeles y 2 MB antes de enviarse, preferentemente WebP.
- Cada archivo usa una URL única y caché de un año; las imágenes del catálogo se cargan bajo demanda.
- La subida reutiliza la contraseña de administrador desde la sesión en memoria. No se persiste en el navegador ni se solicita de nuevo. La función la valida en el servidor y comprueba el tamaño, el formato y la ruta del archivo.
- La clave pública `anon` no da permisos de escritura directa. La función escribe con su clave de servicio, que permanece solo en Supabase. No publiques nunca una clave `service_role`.
- El guardado de productos conserva la URL en el campo `imagen` existente del backend. Las imágenes anteriores no se borran automáticamente para evitar romper referencias compartidas. Los archivos sin uso se pueden limpiar desde Storage una vez verificados.
- La última carta válida se muestra desde la caché local mientras se actualiza. Si falla la conexión, se conserva la carta ya disponible. Tras guardar un producto, se actualiza la interfaz sin volver a descargar toda la carta.

No hacen falta cuentas en Supabase Auth ni permisos de subida para usuarios anónimos. Si creaste un usuario de imágenes con las instrucciones anteriores, ya no se utiliza en este flujo.

Documentación: [secretos de Edge Functions](https://supabase.com/docs/guides/functions/secrets), [políticas de Storage](https://supabase.com/docs/guides/storage/security/access-control).
