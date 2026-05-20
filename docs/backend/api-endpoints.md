# Referencia de la API (Endpoints)

La API base se encuentra en `/api`. Todas las rutas protegidas requieren un token Bearer JWT en el encabezado `Authorization`.

## Autenticación (`/api/auth`)
- `POST /registro`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión y devuelve un token JWT.
- `POST /verify-email`: Verifica el correo electrónico mediante un código.
- `POST /resend-verification`: Reenvía el código de verificación.
- `POST /reset-password/solicitar`: Solicita recuperación de contraseña.
- `POST /reset-password/confirmar`: Confirma el cambio de contraseña con token.
- `GET /verify-token`: Verifica si el token actual es válido (Requiere Auth).

## Anuncios (`/api/anuncios`)
- `GET /`: Lista todos los anuncios (soporta paginación y filtros básicos).
- `GET /buscar`: Búsqueda avanzada con múltiples filtros.
- `GET /:id`: Detalle completo de un anuncio.
- `POST /`: Crea un nuevo anuncio (Requiere Auth, soporta FormData con imágenes).
- `GET /vendedor/mis-anuncios`: Lista anuncios del usuario autenticado (Requiere Auth).
- `PUT /:id`: Actualiza datos de un anuncio (Requiere Auth/Owner).
- `DELETE /:id`: Elimina un anuncio (Requiere Auth/Owner).
- `PATCH /:id/status`: Cambia el estado (disponible/alquilado).
- `POST /:id/fotos`: Sube nuevas fotos a un anuncio.
- `DELETE /:id/fotos/:fotoId`: Elimina una foto específica.

## Usuarios (`/api/users`)
- `GET /profile`: Obtiene el perfil del usuario autenticado.
- `PUT /profile`: Actualiza datos del perfil.
- `DELETE /account`: Desactiva la cuenta del usuario (Lógica de borrado lógico).

## Contacto (`/api/contactos` y `/api/vendedor`)
- `POST /contactos`: Registra una nueva solicitud de contacto desde un anuncio.
- `GET /vendedor/contactos`: Lista los contactos recibidos por el vendedor (Requiere Auth).
- `GET /vendedor/estadisticas`: Estadísticas de visualizaciones y contactos.

## Configuración (`/api/config`)
- `GET /public`: Obtiene configuraciones públicas (ej. nombre del sitio, contacto de soporte).
- `GET /all`: Lista todas las configuraciones (Solo Admin).
- `PUT /update`: Actualiza una configuración específica (Solo Admin).

## Pagos/Suscripciones (`/api/payments`)
- `POST /request`: Solicita la activación de un anuncio premium o pago.
- `GET /my-payments`: Historial de pagos del usuario.
- `GET /pending`: Lista de pagos pendientes de validación (Solo Admin).
- `PUT /:id/process`: Aprobar o rechazar un pago (Solo Admin).
