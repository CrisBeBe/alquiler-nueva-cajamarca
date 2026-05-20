# Gestión de Estado

La aplicación utiliza **React Context API** para manejar el estado global, evitando el "prop drilling" y manteniendo la lógica centralizada.

## Contextos Disponibles

### 1. AuthContext
Maneja la sesión del usuario.
- **Estado:** `user` (objeto con datos del perfil), `token`, `isAuthenticated`, `loading`.
- **Acciones:** `login()`, `logout()`, `updateProfile()`.
- **Persistencia:** El token se guarda en `localStorage` para mantener la sesión tras recargar la página.

### 2. AnuncioContext
Gestiona la lista de anuncios y los filtros de búsqueda.
- **Estado:** `anuncios`, `filtros`, `totalPaginas`, `paginaActual`.
- **Acciones:** `fetchAnuncios()`, `setFiltros()`, `limpiarFiltros()`.

### 3. ConfigContext
Carga las configuraciones dinámicas del sistema desde la API.
- **Estado:** `config` (redes sociales, contacto de soporte, mensajes globales).

## Hooks Personalizados

- **`useAuth`:** Acceso rápido al contexto de autenticación.
- **`useFetch`:** Wrapper sobre Axios para manejar estados de carga y errores de forma estandarizada.
- **`useForm`:** Lógica genérica para el manejo de formularios y validaciones.
- **`useLocalStorage`:** Sincronización de estado con el almacenamiento local del navegador.
