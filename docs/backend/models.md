# Modelos de Datos (Base de Datos)

El backend utiliza **Sequelize** como ORM para interactuar con PostgreSQL. A continuación se detallan los modelos principales:

## User
Representa a los usuarios de la plataforma (inquilinos, propietarios y administradores).
- `id`: UUID (Primary Key)
- `email`: String (Único, obligatorio)
- `password_hash`: String (Obligatorio)
- `nombre`: String
- `telefono`: String
- `rol`: Enum ('admin', 'propietario', 'usuario')
- `estado`: Enum ('activo', 'inactivo', 'baneado')

## Anuncio
Representa una propiedad publicada para alquiler.
- `id`: UUID (Primary Key)
- `usuario_id`: UUID (Relación con User)
- `tipo`: Enum ('cuarto', 'casa', 'habitacion', 'departamento', 'local')
- `titulo`: String
- `descripcion`: String (Soporta texto largo)
- `precio`: Decimal
- `moneda`: String (Default: 'PEN')
- `ubicacion`: String
- `latitud / longitud`: Decimal (Para mapas)
- `estado`: Enum ('disponible', 'alquilado', 'pendiente', 'eliminado')
- `amenidades`: JSON (Lista de servicios como 'wifi', 'agua', etc.)

## FotoAnuncio
Almacena las URLs de las imágenes subidas a Cloudinary asociadas a un anuncio.
- `id`: UUID
- `anuncio_id`: UUID (Relación con Anuncio)
- `url`: String (URL de Cloudinary)
- `public_id`: String (Referencia interna de Cloudinary)
- `es_principal`: Boolean

## ContactoRegistro
Registra las interacciones de contacto entre interesados y propietarios.
- `id`: UUID
- `anuncio_id`: UUID
- `nombre_interesado`: String
- `telefono_interesado`: String
- `mensaje`: Text

## SystemSetting
Configuraciones dinámicas del sistema accesibles por el administrador.
- `clave`: String (Única)
- `valor`: String
- `descripcion`: String
