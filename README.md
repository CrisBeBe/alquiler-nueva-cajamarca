# 🏡 Alquiler Nueva Cajamarca (Alquiler NC)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)

**Alquiler NC** es una plataforma web moderna diseñada para facilitar la conexión entre propietarios que desean alquilar sus inmuebles (casas, cuartos, departamentos, locales) y personas que buscan alquileres en la ciudad de **Nueva Cajamarca, San Martín, Perú**.

---

## 🏗️ Arquitectura del Sistema y Tecnologías

El proyecto sigue una arquitectura **Monorepo** que integra un frontend interactivo y una API REST robusta, desplegada en un entorno Serverless.

### Frontend (Cliente)
*   **Core:** React.js 18
*   **Build Tool:** Vite (Ultra rápido y optimizado)
*   **Estilos:** Tailwind CSS (Diseño responsive y moderno)
*   **Enrutamiento:** React Router DOM v6
*   **Gestión de Estado:** Context API (`AuthContext`, `AnuncioContext`)
*   **Peticiones HTTP:** Axios (Con interceptores para validación de tokens JWT)

### Backend (Servidor API)
*   **Core:** Node.js con Express.js
*   **Arquitectura:** Patrón Controlador-Servicio-Repositorio (MVC escalable)
*   **ORM:** Sequelize (Gestión de base de datos relacional)
*   **Seguridad:** 
    *   `bcryptjs` (Hashing de contraseñas)
    *   `jsonwebtoken` (Autenticación sin estado)
    *   `helmet` & `cors` (Protección de cabeceras HTTP)
*   **Gestión de Archivos:** Multer

### Infraestructura y Despliegue (Producción)
*   **Hosting Global:** [Vercel](https://vercel.com/) (Despliegue Serverless de frontend y backend unificados)
*   **Base de Datos:** [Neon.tech](https://neon.tech/) (PostgreSQL Serverless, escalable y en la nube)
*   **Almacenamiento de Imágenes:** [Cloudinary](https://cloudinary.com/) (Optimización y entrega de imágenes a través de CDN)
*   **Servicio de Correos:** Nodemailer (SMTP a través de Gmail para verificación de cuentas y recuperación de contraseñas)

---

## 📁 Estructura del Proyecto

```text
alquiler_nuevacajamrca/
├── api/                    # Servidor Backend (Express)
│   ├── _src/               # Código fuente del API
│   │   ├── config/         # Conexiones (DB, Cloudinary)
│   │   ├── controllers/    # Lógica de manejo de peticiones
│   │   ├── middlewares/    # Autenticación, validación, manejo de errores
│   │   ├── models/         # Modelos de Base de Datos (Sequelize)
│   │   ├── repositories/   # Capa de abstracción de datos
│   │   ├── routes/         # Definición de endpoints API
│   │   ├── services/       # Lógica de negocio (Auth, Anuncios)
│   │   └── utils/          # Helpers (Mailer, JWT, Paginación)
│   └── index.js            # Punto de entrada Serverless (Vercel)
│
├── frontend/               # Aplicación Cliente (React)
│   ├── src/                
│   │   ├── components/     # Componentes UI reutilizables
│   │   ├── context/        # Estados globales (Auth)
│   │   ├── pages/          # Vistas principales (Home, Login, Dashboard)
│   │   └── services/       # Integración con el API (Axios)
│   └── vite.config.js      # Configuración de compilación
│
├── public/                 # Archivos estáticos y Frontend compilado (dist)
├── vercel.json             # Configuración oficial de despliegue
└── DEPLOYMENT_NOTES.md     # Notas técnicas de resolución de problemas
```

---

## ⚙️ Configuración y Variables de Entorno

Para que el proyecto funcione en cualquier entorno (Local o Producción), requiere las siguientes variables de entorno. 

### Variables para Vercel (Producción)
En el panel de Vercel (`Settings > Environment Variables`), configura:

```ini
# Base de Datos (Neon)
DATABASE_URL="postgresql://usuario:password@host.neon.tech/neondb?sslmode=require"

# Seguridad
JWT_SECRET="clave_secreta_muy_segura_2026"
NODE_ENV="production"

# Frontend Integration
VITE_API_URL="/api"

# Cloudinary (Imágenes)
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"

# SMTP (Correos)
MAIL_HOST="smtp.gmail.com"
MAIL_PORT="587"
MAIL_SECURE="false"
MAIL_USER="tu_correo@gmail.com"
MAIL_PASS="tu_contraseña_de_aplicacion"
MAIL_FROM_NAME="Alquiler Nueva Cajamarca"
MAIL_FROM_ADDRESS="no-reply@alquilernc.com"
```

---

## 📖 Documentación Detallada

Para obtener más información sobre el funcionamiento interno del proyecto, consulta nuestra documentación técnica:

*   **[Índice de Documentación](./docs/README.md)**
*   **[Backend (API)](./docs/backend/index.md)**
*   **[Frontend (Cliente)](./docs/frontend/index.md)**

---

## 🚀 Guía de Despliegue (Deployment)

El proyecto está configurado para unificar el Frontend y Backend en Vercel usando "Rewrites" (ver `vercel.json`).

### Pasos para actualizar la aplicación web:

Si realizas cambios en el código de React (carpeta `frontend/`), debes compilarlo antes de subirlo:

1.  Abre tu terminal y navega a la carpeta frontend:
    ```bash
    cd frontend
    ```
2.  Construye la versión optimizada de producción (asegurando la ruta de la API):
    ```bash
    VITE_API_URL=/api npm run build
    ```
3.  Copia los archivos compilados a la raíz para que Vercel los sirva:
    ```bash
    cp -r dist/* ../public/
    cp -r dist/assets ../
    ```
4.  Sube todo a Vercel:
    ```bash
    cd ..
    vercel --prod
    ```

---

## 🛡️ Seguridad y Funcionalidades Clave

1.  **Protección de Rutas:** El frontend utiliza componentes de "Rutas Protegidas" para evitar acceso no autorizado al Dashboard.
2.  **Autenticación JWT:** El backend emite tokens JWT seguros con firmas verificadas. Las contraseñas nunca se guardan en texto plano (`bcrypt`).
3.  **Prevención CORS:** Configurado para aceptar peticiones unificadas en producción (mismo dominio), evitando ataques de origen cruzado.
4.  **Auto-Sincronización:** En producción, el sistema detecta tablas faltantes en PostgreSQL y ejecuta `sequelize.sync()`, asegurando además que exista un usuario `admin` por defecto.

---

## 🧪 Pruebas Automatizadas (E2E) con Playwright

El proyecto cuenta con una suite de pruebas de extremo a extremo (End-to-End) que automatiza la navegación y verificación de las funciones principales en la web real.

### Requisitos previos
1.  **Navegador:** Tener instalado **Google Chrome** en tu sistema.
2.  **Dependencias:** Asegúrate de haber instalado las dependencias en la carpeta frontend (`npm install`).

### Cómo ejecutar los tests
Navega a la carpeta frontend y ejecuta el comando de prueba:

```bash
cd frontend
# Ejecutar tests en modo invisible (rápido)
npx playwright test tests/full_flow.spec.js

# Ver al robot ejecutando la prueba en vivo (modo headed)
npx playwright test tests/full_flow.spec.js --headed
```

**¿Qué cubren los tests?**
*   Exploración de la página de inicio y conteo de anuncios.
*   Uso del buscador y filtros.
*   Navegación al detalle de un anuncio.
*   Flujo de registro y carga de la página de Login.
*   Inicio de sesión automático con credenciales de administrador.
*   Verificación de acceso al Dashboard y sección de publicación.
*   Gestión de perfil y cierre de sesión seguro.

---

## 🛠️ Correcciones y Mejoras Recientes

1.  **Integridad en Eliminación de Cuentas:** Se implementó una lógica de transacción en el backend para asegurar que, cuando un usuario desactiva su cuenta, todos sus anuncios asociados se marquen automáticamente como `eliminado`, evitando anuncios "huérfanos" en la plataforma.
2.  **Optimización de Búsqueda:** Se ajustó el buscador para ignorar mayúsculas/minúsculas y mejorar la velocidad de filtrado.
3.  **Configuración Multi-Navegador:** Playwright configurado para usar el motor de Chrome instalado en el sistema, ideal para entornos de desarrollo modernos.

---

## 📈 Estrategia SEO
 (Optimización para Motores de Búsqueda)

Para posicionar la web en Google bajo la búsqueda **"alquiler de casas en nueva cajamarca"**, se han implementado y se recomiendan las siguientes prácticas (Ver sección de SEO en el documento para el paso a paso).

*Desarrollado con ❤️ para digitalizar el sector inmobiliario en Nueva Cajamarca.*
