# Alquiler Nueva Cajamarca 🏠

Plataforma web moderna para la publicación y búsqueda de alquileres (habitaciones, casas, departamentos y locales) en la ciudad de Nueva Cajamarca.

## 🚀 Características

- **Gestión de Anuncios**: Los usuarios pueden publicar, editar y pausar sus anuncios.
- **Búsqueda Avanzada**: Filtros por tipo, zona, precio y palabras clave.
- **Galería de Fotos**: Soporte para múltiples imágenes por anuncio (Cloudinary).
- **Contacto Directo**: Enlaces rápidos a WhatsApp y llamadas telefónicas.
- **Panel de Usuario**: Gestión simplificada de los anuncios propios.
- **Seguridad**: Autenticación mediante JWT y protección de rutas.

## 🛠️ Tecnologías

- **Backend**: Node.js, Express, PostgreSQL, Sequelize ORM.
- **Frontend**: React (Vite), Tailwind CSS, React Hook Form, Axios.
- **Servicios Externos**: Cloudinary (imágenes), Gemini AI (opcional para descripciones).

## 📋 Requisitos Previos

- **Node.js** (v18 o superior)
- **PostgreSQL** (base de datos)
- Cuenta en **Cloudinary** (para subida de imágenes)

## ⚙️ Configuración del Proyecto

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd alquiler_nuevacajamrca
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```
Crea un archivo `.env` basado en `.env.example` y completa tus credenciales:
```env
PORT=3000
DB_NAME=alquiler_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=una_clave_secreta_muy_larga
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```
Crea un archivo `.env` (opcional si usas los puertos por defecto):
```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Ejecución

### Iniciar Backend
```bash
cd backend
npm run dev
```
*Nota: En el primer inicio, las tablas se crearán automáticamente gracias a `sequelize.sync`.*

### Poblar Base de Datos (Opcional)
Si deseas tener datos de prueba iniciales:
```bash
cd backend
npm run seed
```

### Iniciar Frontend
```bash
cd frontend
npm run dev
```

## 📖 Documentación de la API

La API está organizada bajo el prefijo `/api`. Algunos endpoints principales:

- `POST /api/auth/registro`: Registro de nuevos usuarios.
- `POST /api/auth/login`: Inicio de sesión (retorna JWT).
- `GET /api/anuncios`: Lista anuncios públicos con filtros.
- `POST /api/anuncios`: Crea un nuevo anuncio (requiere Auth).
- `GET /api/anuncios/vendedor/mis-anuncios`: Lista anuncios del usuario autenticado.

## 🤝 Contribución

1. Haz un Fork del proyecto.
2. Crea una rama para tu característica (`git checkout -b feature/NuevaCaracteristica`).
3. Haz commit de tus cambios (`git commit -m 'Añadir Nueva Caracteristica'`).
4. Push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto es para fines educativos y portafolio profesional.
