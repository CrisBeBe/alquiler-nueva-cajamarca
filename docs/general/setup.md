# Guía de Configuración Local

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

## Requisitos Previos
- **Node.js** (v18 o superior)
- **NPM** o **Yarn**
- **PostgreSQL** (Local o una instancia en la nube como Neon.tech)
- Cuentas en: **Cloudinary**, **Google Gemini API**, y un servidor **SMTP** (ej. Gmail).

## Pasos de Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd alquiler_nuevacajamrca
```

### 2. Configurar el Backend
Navega a la carpeta `api/` (o `backend/` para desarrollo local) y crea un archivo `.env`:

```bash
cd api
npm install
```

**Variables de entorno (.env):**
```ini
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/alquiler_nc
JWT_SECRET=tu_secreto_para_jwt
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

GEMINI_API_KEY=xxx

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-correo@gmail.com
MAIL_PASS=tu-password-de-aplicacion
```

### 3. Configurar el Frontend
Navega a la carpeta `frontend/`, instala dependencias y configura su entorno:

```bash
cd ../frontend
npm install
```

**Variables de entorno (.env):**
```ini
VITE_API_URL=http://localhost:3000/api
```

## Ejecución

### Backend
```bash
# Desde la raíz o carpeta api
npm start
```

### Frontend
```bash
# Desde la carpeta frontend
npm run dev
```

La aplicación debería estar disponible en `http://localhost:5173` y la API en `http://localhost:3000`.
