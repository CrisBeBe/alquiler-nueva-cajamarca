# Documentación del Backend

Esta sección detalla el funcionamiento del servidor API de **Alquiler NC**.

## Introducción
El backend está construido con **Node.js** y el framework **Express**. Su objetivo es proporcionar una API REST segura y eficiente para el frontend y otras posibles integraciones.

## Contenidos
1.  **[Arquitectura](./architecture.md):** Patrones de diseño y organización de carpetas.
2.  **[Endpoints de la API](./api-endpoints.md):** Catálogo de rutas disponibles.
3.  **[Modelos de Datos](./models.md):** Estructura de la base de datos PostgreSQL.
4.  **[Servicios](./services.md):** Lógica de negocio e integraciones (IA, Imágenes, Correo).

## Seguridad
- **JWT (JSON Web Tokens):** Utilizados para la autenticación sin estado.
- **Bcrypt:** Para el hashing de contraseñas antes de guardarlas.
- **Helmet:** Para proteger la aplicación de vulnerabilidades web comunes mediante la configuración de cabeceras HTTP.
- **CORS:** Configurado para permitir solo peticiones desde el dominio del frontend.
- **Validadores:** Uso de `express-validator` para asegurar que los datos de entrada cumplen con el formato esperado.
