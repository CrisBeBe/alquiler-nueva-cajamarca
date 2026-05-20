# Documentación del Frontend

Esta sección detalla la construcción y funcionamiento de la interfaz de usuario de **Alquiler NC**.

## Introducción
El cliente es una aplicación React moderna que prioriza la velocidad, la usabilidad y un diseño limpio optimizado para dispositivos móviles y escritorio.

## Contenidos
1.  **[Arquitectura](./architecture.md):** Organización del proyecto y tecnologías.
2.  **[Componentes y Páginas](./components-pages.md):** Guía de la interfaz de usuario.
3.  **[Gestión de Estado](./state-management.md):** Cómo fluyen los datos en la aplicación.
4.  **[Pruebas E2E](./testing.md):** Verificación automatizada de funcionalidades.

## Integración con la API
Toda la comunicación con el backend se realiza a través de `frontend/src/services/api.js`, que configura una instancia de **Axios** con:
- `baseURL` configurada mediante variables de entorno.
- Interceptores para añadir automáticamente el token JWT en las peticiones.
- Manejo centralizado de errores de red o autenticación (ej. redirección al login si el token expira).
