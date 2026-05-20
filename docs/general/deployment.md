# Despliegue y Mantenimiento

El proyecto está optimizado para ser desplegado en **Vercel**, aprovechando su soporte para funciones Serverless y hosting de archivos estáticos.

## Despliegue en Vercel

### 1. Preparación del Frontend
Debido a que Vercel sirve el frontend desde la carpeta `public/` en la raíz (según la configuración actual), es necesario compilar el frontend y mover los archivos:

```bash
cd frontend
VITE_API_URL=/api npm run build
cp -r dist/* ../public/
cp -r dist/assets ../
```

### 2. Configuración de `vercel.json`
El archivo `vercel.json` en la raíz maneja el enrutamiento:
- Las rutas que comienzan con `/api` se dirigen a `api/index.js`.
- El resto de las rutas sirven los archivos estáticos o redirigen a `index.html` (para Single Page Application).

### 3. Variables de Entorno en Vercel
Asegúrate de configurar todas las variables mencionadas en la [Guía de Configuración](./setup.md) en el panel de control de Vercel. **Importante:** `NODE_ENV` debe ser `production`.

## Mantenimiento de la Base de Datos

El backend utiliza Sequelize con sincronización automática en producción (`sequelize.sync()`). 
- **Semilla Inicial:** El sistema verifica si existe un usuario administrador al iniciar; si no, lo crea automáticamente con credenciales por defecto.
- **Migraciones:** Para cambios estructurales grandes, se recomienda usar las migraciones de Sequelize (ubicadas en `backend/src/migrations`).

## Monitoreo
- **Vercel Logs:** Útiles para depurar errores en las funciones serverless de la API.
- **Cloudinary Dashboard:** Para gestionar el almacenamiento de imágenes y el ancho de banda.
- **Neon Dashboard:** Para monitorear el rendimiento de las consultas y el uso de almacenamiento de PostgreSQL.
