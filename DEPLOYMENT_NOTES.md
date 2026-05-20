# Guía de Despliegue y Solución de Problemas - Alquiler Nueva Cajamarca

Este documento resume los cambios realizados para corregir el despliegue en Vercel y sirve como referencia para futuros mantenimientos.

## 1. Problemas Identificados y Solucionados

### A. Conexión de Base de Datos (PostgreSQL)
*   **Problema:** La aplicación intentaba conectar a `localhost` en la nube.
*   **Solución:** Se configuró la variable `DATABASE_URL` en Vercel apuntando a la base de datos de Neon.tech. Se habilitó el modo SSL (`ssl: { rejectUnauthorized: false }`) en `api/_src/config/database.js` para permitir conexiones seguras desde Vercel.

### B. Error de Origen Cruzado (CORS / localhost:3000)
*   **Problema:** El frontend compilado tenía la URL `http://localhost:3000` grabada a fuego, lo que bloqueaba las peticiones en producción.
*   **Solución:** Se reconstruyó el frontend usando la variable de entorno `VITE_API_URL=/api`. Esto permite que el frontend use rutas relativas, eliminando cualquier referencia a `localhost`.

### C. Error 404 al Refrescar
*   **Problema:** Al ser una Single Page Application (SPA), Vercel perdía la ruta al recargar la página (ej. en `/login`).
*   **Solución:** Se actualizó `vercel.json` con una regla de "rewrites" que redirige todas las rutas no-API al `index.html`.

### D. Usuario Administrador Inaccesible
*   **Problema:** No se podía iniciar sesión por falta de datos o contraseñas incorrectas en la nueva BD.
*   **Solución:** Se añadió un script de inicialización en `api/index.js` que detecta si el admin existe y fuerza su creación/actualización con credenciales conocidas.

---

## 2. Configuración del Entorno (Vercel)

Para que el sistema funcione, las siguientes Variables de Entorno **deben** estar configuradas en el panel de Vercel:

| Variable | Descripción |
| :--- | :--- |
| `DATABASE_URL` | URL de conexión de Neon/Supabase (PostgreSQL) |
| `JWT_SECRET` | Clave secreta para tokens de sesión |
| `NODE_ENV` | Debe ser `production` |
| `VITE_API_URL` | Debe ser `/api` |
| `CLOUDINARY_*` | Credenciales de Cloudinary (Cloud Name, API Key, Secret) |
| `MAIL_*` | Configuración de SMTP (Host, Port, User, Pass) para correos |

---

## 3. Credenciales de Acceso Inicial (Admin)

*   **Email:** `cabreracristhian662@gmail.com`
*   **Contraseña:** `admin2026_secure`

> **NOTA:** Se recomienda cambiar esta contraseña desde el perfil de usuario una vez dentro del panel.

---

## 4. Cómo Desplegar Cambios Futuros

Si realizas cambios en el **Frontend**, debes reconstruirlo antes de subirlo:

```bash
# 1. Entrar a la carpeta frontend
cd frontend
# 2. Instalar dependencias si hay nuevas
npm install
# 3. Construir para producción con la URL correcta
VITE_API_URL=/api npm run build
# 4. Copiar los archivos a la carpeta pública del proyecto raíz
cp -r dist/* ../public/
cp -r dist/assets ../
# 5. Desplegar a Vercel
cd ..
vercel --prod
```

---

## 5. Diagnóstico de Salud
Puedes verificar el estado de la conexión en tiempo real entrando a:
`https://tu-dominio.vercel.app/api/health`

---

## 6. Mantenimiento y Calidad (Actualización 2026)

### A. Integridad de Datos al Eliminar Usuarios
Se ha corregido el flujo de baja de usuarios. Anteriormente, al desactivar una cuenta, los anuncios permanecían visibles. Ahora, el `UserService.deleteAccount` utiliza una transacción que garantiza:
1.  Estado del usuario: `inactivo`.
2.  Estado de sus anuncios: `eliminado`.

### B. Pruebas Automáticas (Playwright)
Para asegurar que la web real no tenga errores tras un despliegue, se ha integrado Playwright.
*   **Comando:** `npx playwright test tests/full_flow.spec.js` (desde la carpeta `frontend/`).
*   **Uso:** Ejecutar siempre después de un despliegue a Vercel para confirmar que el login y la navegación siguen funcionando.
