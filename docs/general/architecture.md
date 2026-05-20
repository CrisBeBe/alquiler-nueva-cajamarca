# Arquitectura del Sistema

El proyecto sigue una estructura de **Monorepo** simplificada, diseñada para ser desplegada como una sola unidad en Vercel, pero manteniendo una separación clara de responsabilidades.

## Diagrama de Flujo Lógico

1.  **Frontend (React):** Se encarga de la interfaz de usuario. Realiza peticiones HTTP al backend a través de `/api`.
2.  **API Gateway (Vercel):** Redirige las peticiones que comienzan con `/api` al servidor Express y sirve los archivos estáticos del frontend para el resto de las rutas.
3.  **Backend (Express):** Implementa la lógica de negocio siguiendo el patrón **Controller-Service-Repository**.
4.  **Servicios Externos:**
    - **Database:** PostgreSQL para persistencia de datos relacionales.
    - **Cloudinary:** Para el almacenamiento y optimización de imágenes.
    - **Gemini AI:** Para el procesamiento de lenguaje natural.
    - **SMTP:** Para el envío de correos electrónicos.

## Estructura de Carpetas

```text
/
├── api/                    # Servidor Backend optimizado para Vercel
│   └── _src/               # Código fuente (Controllers, Services, Models)
├── frontend/               # Código fuente del cliente (React)
├── public/                 # Archivos estáticos y compilado del frontend
├── docs/                   # Documentación técnica (esta carpeta)
└── vercel.json             # Configuración de rutas y despliegue
```

## Flujo de Datos en el Backend

1.  **Routes:** Define los endpoints y aplica middlewares (auth, validación).
2.  **Controllers:** Recibe la petición, extrae datos y llama al servicio correspondiente.
3.  **Services:** Contiene la lógica de negocio compleja e interactúa con múltiples repositorios o servicios externos.
4.  **Repositories:** Realiza las consultas directas a la base de datos usando Sequelize.
5.  **Models:** Define el esquema de las tablas en PostgreSQL.
