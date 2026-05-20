# Arquitectura Frontend

El frontend es una Single Page Application (SPA) construida con **React** y **Vite**.

## Estructura de la Aplicación

```text
frontend/src/
├── components/     # Componentes UI reutilizables
├── context/        # Proveedores de estado global (Context API)
├── hooks/          # Custom hooks para lógica compartida
├── layouts/        # Estructuras de página (Header, Footer, Main Content)
├── pages/          # Vistas principales de la aplicación
├── services/       # Cliente Axios y llamadas a la API
└── utils/          # Funciones de ayuda (formateo, validación)
```

## Flujo de Navegación
La navegación se gestiona mediante **React Router DOM**.
- **Rutas Públicas:** Home, Detalles de Anuncio, Búsqueda, Login, Registro.
- **Rutas Protegidas:** Dashboard, Publicar Anuncio, Editar Anuncio, Perfil.
- **Rutas de Administrador:** Admin Dashboard, Configuración Global.

## Estilos y Diseño
- **Tailwind CSS:** Se utiliza para todo el estilado, permitiendo un diseño responsive y rápido de desarrollar.
- **Componentes de UI:** Se han creado componentes personalizados (Cards, Modales, Formularios) para mantener la consistencia visual.
- **Iconografía:** Uso de librerías como `lucide-react` para iconos vectoriales.
