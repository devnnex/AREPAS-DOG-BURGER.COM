# Activar las imágenes de productos

El catálogo, los precios, los extras y la contraseña actual siguen usando Google Apps Script. Supabase almacena únicamente las imágenes. No hace falta migrar productos ni instalar dependencias.

## Configuración inicial (una sola vez)

1. Abre el [SQL Editor de Supabase](https://supabase.com/dashboard/project/pnubnimuizpgprtkbcwk/sql/new), copia el contenido de `product-images.sql` y pulsa **Run**. Crea el bucket público `product-images`, que es la carpeta donde se alojarán las fotos, y los permisos de subida.
2. En **Authentication → Users → Add user → Create new user**, crea el usuario de imágenes con tu correo y una contraseña. Marca **Auto Confirm User**. Este acceso es distinto de la contraseña actual del panel.
3. Ejecuta este SQL, sustituyendo el correo por el del usuario que acabas de crear:

   ```sql
   insert into public.product_image_admins (user_id)
   select id from auth.users where email = 'TU_CORREO_ADMIN'
   on conflict do nothing;
   ```

4. En la web abre el panel, edita o crea un producto y elige una foto. Pulsa **Guardar producto** y conecta con ese correo y contraseña cuando se solicite. También puedes conectar antes con **Conectar almacenamiento**.

Si la subida falla, los datos del producto y la imagen anterior se conservan. Si la foto se sube pero falla el guardado del producto, vuelve a guardar: se reutiliza la misma URL, sin subir la foto otra vez. **Cancelar** descarta la selección local. **Restaurar original** vuelve a la foto predeterminada del catálogo al guardar; para productos sin foto predeterminada, elimina la imagen asignada.

## Rendimiento y permisos

- Vista previa local inmediata; no se sube nada al seleccionar o cancelar.
- Archivos JPG, PNG o WebP de hasta 12 MB; se reducen a un máximo de 1600 píxeles y 2 MB antes de enviarse, preferentemente WebP.
- Cada archivo usa una URL única y caché de un año; las imágenes del catálogo se cargan bajo demanda.
- Las sesiones de imágenes se mantienen solo en memoria y se eliminan al salir del panel. No se guarda la contraseña.
- Solo los usuarios incluidos en `product_image_admins` pueden subir. La clave pública `anon` no da permisos de escritura. No publiques nunca una clave `service_role`.
- El guardado de productos conserva la URL en el campo `imagen` existente del backend. Las imágenes anteriores no se borran automáticamente para evitar romper referencias compartidas. Los archivos sin uso se pueden limpiar desde Storage una vez verificados.
- La última carta válida se muestra desde la caché local mientras se actualiza. Si falla la conexión, se conserva la carta ya disponible. Tras guardar un producto, se actualiza la interfaz sin volver a descargar toda la carta.

Documentación: [políticas de Supabase Storage](https://supabase.com/docs/guides/storage/security/access-control), [buckets públicos](https://supabase.com/docs/guides/storage/buckets/fundamentals).
