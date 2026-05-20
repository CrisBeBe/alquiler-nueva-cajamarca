# Servicios e Integraciones

El backend delega la lógica compleja y la integración con terceros a la capa de **Services**.

## Gemini Service (`GeminiService.js`)
Utiliza la API de Google Generative AI para mejorar el contenido de los anuncios.
- **`improveDescription(description)`**: Toma una descripción básica y la devuelve optimizada para marketing inmobiliario.
- **`generateTitle(description)`**: Crea un título atractivo basado en el contenido del anuncio.

## Cloudinary (Integración)
No existe un "Service" único para Cloudinary, pero se utiliza a través de `uploadMiddleware` y en `AnuncioService` para gestionar imágenes:
- **Subida:** Se envían buffers de imagen que se cargan directamente a la nube.
- **Optimización:** Se solicitan transformaciones automáticas (f_auto, q_auto) para mejorar la velocidad de carga.
- **Eliminación:** Borrado de imágenes mediante su `public_id` cuando un anuncio o foto se elimina.

## Mailer Service (`mailer.js`)
Configurado con `nodemailer` para gestionar el envío de correos:
- **Verificación:** Envío de códigos numéricos de 6 dígitos.
- **Recuperación:** Envío de enlaces con tokens temporales.
- **Contacto:** Notificación al propietario cuando alguien se interesa en su anuncio.

## Cron Service (`cronService.js`)
Tareas programadas para el mantenimiento del sistema:
- **Limpieza:** Eliminación de anuncios marcados como borrados hace más de X días.
- **Expiración:** Cambio automático de estado de anuncios si su tiempo de publicación ha expirado.
