# Backend - Alquiler Nueva Cajamarca

API REST desarrollada con Node.js y Express para gestionar la plataforma de alquileres.

## 🏗️ Arquitectura

El proyecto sigue un patrón de capas:
- **Models**: Definición de esquemas de datos usando Sequelize.
- **Repositories**: Capa de acceso a datos (abstracción de la base de datos).
- **Services**: Lógica de negocio y coordinación de tareas complejas.
- **Controllers**: Manejo de peticiones HTTP y respuestas.
- **Routes**: Definición de endpoints de la API.
- **Middlewares**: Autenticación, validación, manejo de errores y subida de archivos.

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con `nodemon`.
- `npm start`: Inicia el servidor en modo producción.
- `npm run seed`: Puebla la base de datos con datos de prueba iniciales (usuario admin y anuncios).

## 🗄️ Base de Datos

Se utiliza **PostgreSQL**. La sincronización se realiza automáticamente en desarrollo mediante `sequelize.sync({ alter: true })`.

### Modelos Principales
- **User**: Usuarios registrados (arrendadores).
- **Anuncio**: Información detallada de los inmuebles.
- **FotoAnuncio**: URLs de imágenes subidas a Cloudinary.
- **ContactoRegistro**: Registro de interesados (lead generation).

## 🔐 Seguridad
- JWT para sesiones.
- Hasheo de contraseñas con `bcrypt`.
- Validaciones con `express-validator`.
- Protección contra ataques comunes con `helmet` y `cors`.

## 🖼️ Manejo de Imágenes
Se utiliza `multer` con un storage engine para **Cloudinary**. Las imágenes se suben directamente a la nube y se almacena solo la URL en la base de datos.
