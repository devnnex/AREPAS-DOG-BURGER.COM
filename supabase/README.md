# Activar las imágenes de productos

El catálogo, los precios, los extras y el acceso actual siguen usando Google Apps Script. Supabase almacena únicamente las fotos. Dentro del administrador se elige, elimina o reemplaza la foto y se guarda el producto, sin otro formulario de acceso.

## Configuración inicial (una sola vez)

1. En el [SQL Editor](https://supabase.com/dashboard/project/pnubnimuizpgprtkbcwk/sql/new), ejecuta `product-images.sql`. Crea la carpeta pública `product-images` y bloquea las subidas directas desde el navegador. Si ejecutaste la versión anterior, vuelve a ejecutar este archivo actualizado.
2. La contraseña se define únicamente en `ADMIN_PASSWORD` del Apps Script publicado. No crees otro usuario ni copies la contraseña a Supabase o al código del navegador.
3. En **Edge Functions → Deploy a new function → Via Editor**, crea una función llamada **`product-images`**. Reemplaza el contenido de `index.ts` por el de `functions/product-images/index.ts` de este repositorio y despliega. Mantén la comprobación JWT activada: la web ya envía la clave pública existente. Supabase proporciona `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` dentro de la función; esa clave privada nunca se envía al navegador. También se puede desplegar con Supabase CLI.
4. Abre la web, entra con tu contraseña habitual, edita un producto, elige una foto y guarda. No se solicita ningún correo ni un segundo acceso.

Para cambiar la contraseña, modifica `ADMIN_PASSWORD` y publica una nueva versión del Apps Script en la misma implementación. Tanto el acceso al panel como cada subida de fotos consultan ese backend; no hay una segunda contraseña ni una copia en Supabase. Las sesiones abiertas con la clave anterior ya no pueden guardar ni subir fotos.

## Validación del administrador

El panel permanece cerrado hasta que el servidor confirma el acceso. La función de fotos envía por POST la acción de solo validación `validateAdmin` al Apps Script, sin modificar productos ni hojas. En el Apps Script suministrado, `validateAdminPassword_` se ejecuta antes de despachar las acciones. Por eso la respuesta exacta `Accion POST no soportada: validateAdmin` indica que la contraseña ya pasó la validación; se admite para mantener compatibilidad con esa implementación. También se admite una respuesta explícita `ok: true` si se añade esa acción al backend. Cualquier otro error o falta de conexión deniega el acceso. No se registra ni se guarda la contraseña en archivos ni en el navegador.

Si la subida falla, los datos del producto y la imagen anterior se conservan. Si la foto se sube pero falla el guardado del producto, vuelve a guardar: se reutiliza la misma URL, sin subir la foto otra vez. **Cancelar** descarta la selección local. **Reemplazar foto** permite elegir otra imagen. **Eliminar foto** deja el producto sin imagen al guardar, incluso si tenía una foto local o predeterminada. La eliminación queda registrada en el campo `imagen` con el valor interno `__no_image__`, para que la foto predeterminada no reaparezca.

Después de guardar un reemplazo o eliminar la foto asignada, la función consulta la carta persistida y borra de Supabase la imagen anterior si ningún producto ni opción la utiliza, incluidos productos inactivos. Las fotos locales del repositorio no se borran. Si falla la limpieza por conexión o servicio, se conserva la nueva foto y se registra la URL anterior pendiente en el navegador para reintentar en los siguientes guardados. No se borra una foto basándose únicamente en lo que muestra el formulario.

## Rendimiento y permisos

- Vista previa local inmediata; no se sube nada al seleccionar o cancelar.
- El archivo original no tiene un límite de peso impuesto por el selector. Se admiten los formatos nativos del navegador (JPG/JPEG/JFIF, PNG, WebP, GIF, AVIF, BMP, SVG y otros compatibles), fotos HEIC/HEIF mediante conversión local y TIFF mediante UTIF. También se intentan abrir los RAW compatibles con ese decodificador. El navegador adapta la selección a una imagen fija de hasta 1600 píxeles y ajusta su calidad y dimensiones automáticamente para enviar una copia de hasta 2 MB, preferentemente WebP. Ese tamaño corresponde a la copia procesada que recibe la función, no al archivo que el administrador puede seleccionar. Los archivos sin tipo MIME se detectan por su contenido; los dañados o no reconocidos muestran un error. Los decodificadores adicionales se cargan solo al necesitarlos.
- Cada archivo usa una URL única y caché de un año; las imágenes del catálogo se cargan bajo demanda.
- La subida reutiliza la contraseña de administrador desde la sesión en memoria. No se persiste en el navegador ni se solicita de nuevo. La función la verifica contra Apps Script en cada petición y comprueba el tamaño, el formato y la ruta del archivo. El antiguo secreto `PRODUCT_IMAGE_ADMIN_PASSWORD` ya no se utiliza.
- La clave pública `anon` no da permisos de escritura directa. La función escribe con su clave de servicio, que permanece solo en Supabase. No publiques nunca una clave `service_role`.
- El guardado conserva la URL en el campo `imagen` existente de Apps Script. Al reemplazar una foto o quitarla, la anterior se elimina de Storage después del guardado si ya no está en uso. La eliminación se realiza mediante la API de Storage, nunca borrando filas de `storage.objects` con SQL.
- La última carta válida se muestra desde la caché local mientras se actualiza. Si falla la conexión, se conserva la carta ya disponible. Tras guardar un producto, se actualiza la interfaz sin volver a descargar toda la carta.

No hacen falta cuentas en Supabase Auth ni permisos de subida para usuarios anónimos. Si creaste un usuario de imágenes con las instrucciones anteriores, ya no se utiliza en este flujo.

Documentación: [secretos de Edge Functions](https://supabase.com/docs/guides/functions/secrets), [políticas de Storage](https://supabase.com/docs/guides/storage/security/access-control).

El SQL actualizado usa `null` en `file_size_limit` para quitar la restricción particular del bucket. Vuelve a ejecutarlo si ya creaste el almacenamiento. Se mantienen los límites globales de Supabase y la capacidad del dispositivo para abrir la foto; consulta los [límites de Storage](https://supabase.com/docs/guides/storage/uploads/file-limits).
