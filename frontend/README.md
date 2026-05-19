# Frontend - Alquiler Nueva Cajamarca

Aplicación web desarrollada con React y Vite.

## 🚀 Tecnologías

- **React 18**: Biblioteca principal.
- **Vite**: Herramienta de construcción ultrarrápida.
- **Tailwind CSS**: Framework de diseño para una interfaz moderna y responsiva.
- **React Router Dom**: Gestión de navegación y rutas.
- **React Hook Form + Yup**: Manejo y validación de formularios complejos.
- **Axios**: Cliente HTTP para comunicación con la API.
- **React Context API**: Gestión del estado global (Autenticación y Anuncios).

## 📁 Estructura de Carpetas

- `src/components`: Componentes reutilizables (Botones, Inputs, Cards).
- `src/context`: Proveedores de estado global.
- `src/hooks`: Hooks personalizados (useAuth, useForm).
- `src/layouts`: Estructuras base de las páginas.
- `src/pages`: Vistas principales de la aplicación.
- `src/services`: Configuración de Axios y llamadas a la API.
- `src/utils`: Funciones auxiliares y constantes.

## 🔑 Funcionalidades Implementadas

- **Autenticación**: Login y Registro con persistencia en `localStorage`.
- **Publicación**: Formulario dinámico con subida de imágenes.
- **Filtros**: Búsqueda en tiempo real por precio, zona y tipo.
- **Responsividad**: Diseño optimizado para móviles y escritorio.
- **Feedback**: Notificaciones con `react-toastify`.

## 🛠️ Instalación y Uso

1. Instalar dependencias: `npm install`
2. Configurar `.env` (opcional): `VITE_API_URL=http://localhost:3000/api`
3. Ejecutar: `npm run dev`
