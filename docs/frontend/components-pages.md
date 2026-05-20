# Componentes y Páginas

## Páginas Principales

- **Home (`Home.jsx`):** Página de aterrizaje con buscador y lista de anuncios destacados/recientes.
- **Detalle de Anuncio (`AnuncioDetalle.jsx`):** Muestra toda la información de un inmueble, galería de fotos y botón de contacto.
- **Dashboard (`Dashboard.jsx`):** Panel para propietarios donde pueden ver sus anuncios, estadísticas y mensajes.
- **Publicar/Editar Anuncio:** Formularios dinámicos que incluyen la integración con la IA para mejorar textos.
- **Login / Registro:** Flujos de autenticación con validación de correo.

## Componentes Reutilizables

- **CardAnuncio:** Representación visual compacta de un anuncio para listas y resultados de búsqueda.
- **FiltrosBuscador:** Barra lateral o superior con opciones para filtrar por precio, tipo y amenidades.
- **GaleriaFotos:** Visor de imágenes con soporte para pantalla completa.
- **FormularioAnuncio:** Componente complejo que maneja la subida de múltiples archivos y validación de campos.
- **SkeletonCard:** Marcador de posición (loading state) para mejorar la experiencia de usuario durante la carga de datos.

## Layouts
- **MainLayout:** Envuelve la mayoría de las páginas, proporcionando el `Header` (navegación) y el `Footer` de manera consistente.
