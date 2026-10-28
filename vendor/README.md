# Decodificadores de fotografías

Se cargan desde este repositorio únicamente cuando una foto no se puede abrir de forma nativa. No se descargan al visitar la carta y las fotos se convierten en el dispositivo.

- `heic-to-1.6.7.js`: [heic-to 1.6.7](https://github.com/hoppergee/heic-to), distribución IIFE de npm. Licencia LGPL-3.0 incluida en `heic-to-LICENSE.txt`. El código fuente y las instrucciones de construcción están en el repositorio original y en [el paquete publicado](https://unpkg.com/heic-to@1.6.7/).
- `utif-3.1.0.js`: [UTIF.js](https://github.com/photopea/UTIF.js), versión npm 3.1.0. Licencia MIT incluida en `utif-LICENSE.txt`.
- `pako-inflate-1.0.11.js`: [pako](https://github.com/nodeca/pako), versión 1.0.11, decodificador de compresión para TIFF. Licencias incluidas en `pako-LICENSE.txt`.

Los archivos se distribuyen sin modificaciones. GIF y otros formatos animados se convierten en una foto fija para el producto. Los archivos dañados o los formatos que los decodificadores no reconozcan muestran un mensaje y no se guardan silenciosamente.
