# ROL DEL MODELO

Actúa como un **arquitecto backend senior full stack especializado en Node.js, Express.js, PostgreSQL, Sequelize y diseño de APIs REST empresariales**.

Tu tarea es construir un backend completo, profesional, escalable, seguro y listo para producción para una plataforma llamada:

# “Alquiler Nueva Cajamarca”

El backend debe implementarse siguiendo:

- Clean Architecture
- principios SOLID
- separación de responsabilidades
- arquitectura modular
- buenas prácticas empresariales
- seguridad avanzada
- código reutilizable
- mantenibilidad a largo plazo

Todo el código generado debe ser:

- profesional
- modular
- bien comentado
- optimizado
- reutilizable
- escalable
- compatible con Linux
- listo para ejecutar inmediatamente

---

# OBJETIVO GENERAL

Desarrollar un backend completo en:

- Node.js v18+
- Express.js
- PostgreSQL
- Sequelize ORM

La plataforma permitirá:

- registro e inicio de sesión de usuarios
- publicación de anuncios de alquiler
- subida de imágenes
- filtros y búsquedas avanzadas
- contacto entre usuarios
- estadísticas
- integración opcional con IA Gemini Pro

---

# STACK TECNOLÓGICO OBLIGATORIO

## Backend

- Node.js v18+
- Express.js

## Base de datos

- PostgreSQL
- Sequelize ORM

## Seguridad

- JWT (jsonwebtoken)
- bcrypt
- helmet
- express-rate-limit
- cors

## Validaciones

- express-validator

## Variables de entorno

- dotenv

## Upload de imágenes

- multer
- cloudinary
- almacenamiento local como fallback

## Utilidades

- nodemailer
- uuid

# FUNCIONALIDADES PRINCIPALES

# 1. AUTENTICACIÓN Y USUARIOS

Implementar sistema completo de autenticación JWT.

---

## REGISTRO

Endpoint:

```http
POST /api/auth/registro
```

Campos:

- email
- password
- nombre_completo
- telefono
- foto_perfil_url opcional

Requisitos:

- validar email único
- encriptar contraseña con bcrypt
- generar JWT automáticamente
- retornar token + usuario
- validaciones robustas
- manejo profesional de errores

---

## LOGIN

Endpoint:

```http
POST /api/auth/login
```

Validaciones:

- email existente
- contraseña correcta

Retornar:

- JWT
- datos del usuario

---

## VERIFY TOKEN

Endpoint:

```http
GET /api/auth/verify-token
```

Debe validar JWT y retornar usuario autenticado.

---

## RECUPERACIÓN DE CONTRASEÑA

Endpoints:

```http
POST /api/auth/reset-password/solicitar
POST /api/auth/reset-password/confirmar
```

Implementar:

- token temporal
- expiración
- envío de email
- cambio seguro de contraseña

---

## PERFIL DE USUARIO

Endpoints:

```http
GET /api/users/profile
PUT /api/users/profile
DELETE /api/users/account
```

Características:

- rutas protegidas
- actualización parcial
- cambio de contraseña
- cambio de foto
- estadísticas del usuario

---

# 2. GESTIÓN DE ANUNCIOS

---

## CREAR ANUNCIO

Endpoint:

```http
POST /api/anuncios
```

Campos:

- tipo
- titulo
- descripcion
- precio_mensual
- direccion
- zona
- amenidades
- metodo_contacto
- numero_contacto
- correo_contacto
- telefono_contacto

Requisitos:

- validaciones completas
- transacciones Sequelize
- estado inicial activo
- soporte IA opcional

---

## OBTENER ANUNCIOS

Endpoint:

```http
GET /api/anuncios
```

Implementar:

- filtros
- búsqueda
- ordenamiento
- paginación
- contador de visualizaciones

Filtros:

- tipo
- rango_precio
- zona
- búsqueda textual

Ordenamientos:

- fecha_desc
- precio_asc
- precio_desc

---

## DETALLE DE ANUNCIO

Endpoint:

```http
GET /api/anuncios/:id
```

Debe retornar:

- información completa
- fotos
- vendedor
- amenidades
- visualizaciones

---

## MIS ANUNCIOS

Endpoint:

```http
GET /api/vendedor/mis-anuncios
```

Debe incluir:

- estadísticas
- visualizaciones
- estado
- cantidad de contactos

---

## ACTUALIZAR ANUNCIO

Endpoint:

```http
PUT /api/anuncios/:id
```

Restricciones:

- solo propietario
- validaciones
- actualización parcial

---

## CAMBIAR ESTADO

Endpoint:

```http
PATCH /api/anuncios/:id/status
```

Estados:

- activo
- pausado
- eliminado

---

## ELIMINACIÓN LÓGICA

Endpoint:

```http
DELETE /api/anuncios/:id
```

Implementar soft delete.

Nunca eliminar físicamente registros.

---

# 3. GESTIÓN DE IMÁGENES

---

## SUBIR IMÁGENES

Endpoint:

```http
POST /api/anuncios/:id/fotos
```

Requisitos:

- multer
- validación MIME
- máximo 5MB
- jpg/png/webp
- mínimo 3 fotos
- máximo 15 fotos

Implementar:

- Cloudinary
- fallback local
- middleware reutilizable

---

## REORDENAR FOTOS

Endpoint:

```http
PUT /api/anuncios/:id/fotos/reorder
```

---

## ELIMINAR FOTO

Endpoint:

```http
DELETE /api/anuncios/:id/fotos/:fotoId
```

Restricción:

- no permitir eliminar la última foto

---

# 4. CONTACTOS Y MENSAJERÍA

---

## REGISTRAR CONTACTO

Endpoint:

```http
POST /api/contactos
```

Campos:

- visitante_email
- anuncio_id
- tipo_contacto

Implementar:

- prevención anti-spam
- máximo un contacto por hora por email y anuncio

---

## HISTORIAL DE CONTACTOS

Endpoint:

```http
GET /api/vendedor/contactos
```

---

## ENVÍO DE EMAILS

Endpoint:

```http
POST /api/correos/enviar
```

Implementar:

- utilidades nodemailer
- plantillas reutilizables
- notificaciones al vendedor

---

# 5. BÚSQUEDA AVANZADA

Endpoint:

```http
GET /api/anuncios/buscar
```

Parámetros:

- q
- tipo
- precio_min
- precio_max
- zona
- amenidades

Características:

- filtros dinámicos
- paginación
- consultas optimizadas

---

# 6. ESTADÍSTICAS

Endpoint:

```http
GET /api/vendedor/estadisticas
```

Debe retornar:

- total_anuncios
- total_visualizaciones
- anuncios_activos
- últimos_contactos

---

# MODELOS DE BASE DE DATOS

# MODELO USUARIO

```txt
id UUID PK
email STRING UNIQUE NOT NULL
password_hash STRING NOT NULL
nombre_completo STRING NOT NULL
telefono STRING
foto_perfil_url STRING
fecha_registro DATE
estado ENUM(activo,inactivo)
createdAt DATE
updatedAt DATE
```

---

# MODELO ANUNCIO

```txt
id UUID PK
usuario_id UUID FK
tipo ENUM(cuarto,casa)
titulo STRING
descripcion TEXT
precio_mensual DECIMAL
direccion STRING
zona STRING
amenidades JSON
metodo_contacto ENUM(whatsapp,correo,telefono,multicanal)
numero_contacto STRING
correo_contacto STRING
telefono_contacto STRING
visualizaciones INTEGER DEFAULT 0
estado ENUM(activo,pausado,eliminado)
fecha_publicacion DATE
createdAt DATE
updatedAt DATE
```

---

# MODELO FOTO_ANUNCIO

```txt
id UUID PK
anuncio_id UUID FK
url_foto STRING
orden_presentacion INTEGER
fecha_subida DATE
createdAt DATE
updatedAt DATE
```

---

# MODELO CONTACTO_REGISTRO

```txt
id UUID PK
anuncio_id UUID FK
visitante_email STRING
tipo_contacto ENUM(whatsapp,correo,telefono)
fecha_contacto DATE
createdAt DATE
updatedAt DATE
```

---

# VALIDACIONES OBLIGATORIAS

Usar:

```txt
express-validator
```

Validar:

- email válido y único
- contraseña:
  - mínimo 8 caracteres
  - mayúsculas
  - minúsculas
  - números
- teléfono peruano válido
- precio > 0
- descripción:
  - mínimo 20
  - máximo 5000
- título:
  - mínimo 5
  - máximo 100
- dirección mínimo 5 caracteres
- zona válida de Nueva Cajamarca
- fotos válidas

---

# SEGURIDAD

Implementar:

- JWT middleware
- Helmet
- CORS configurable
- express-rate-limit
- sanitización
- validación ownership
- manejo centralizado de errores
- logs de errores
- protección rutas privadas

---

# MANEJO DE ERRORES

Formato obligatorio:

```json
{
  "error": "mensaje",
  "code": "ERROR_CODE"
}
```

Crear:

```txt
middleware/errorHandler.js
```

---

# PAGINACIÓN

Crear helper reutilizable para:

- limit
- page
- total
- totalPages

---

# TRANSACCIONES

Usar transacciones Sequelize en:

- registro
- creación anuncios
- subida imágenes
- eliminación lógica

---

# IA GEMINI PRO

Integración opcional para:

- mejorar descripciones
- generar títulos
- detectar fraude
- recomendaciones inteligentes

Crear:

```txt
services/gemini.service.js
```

---

# DOCUMENTACIÓN

Generar:

- README.md completo
- .env.example
- comentarios JSDoc
- instrucciones Linux
- scripts npm

---

# PACKAGE.JSON

Debe incluir todas las dependencias necesarias.

## Dependencias

- express
- sequelize
- pg
- pg-hstore
- dotenv
- cors
- bcrypt
- jsonwebtoken
- multer
- cloudinary
- express-validator
- helmet
- express-rate-limit
- nodemailer
- uuid

## DevDependencies

- nodemon

---

# SCRIPTS

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

---

# BASE DE DATOS

Implementar:

- conexión automática
- sincronización Sequelize
- creación automática
- seeds iniciales
- migrations

---

# ENDPOINTS OBLIGATORIOS

```http
POST   /api/auth/registro
POST   /api/auth/login
POST   /api/auth/reset-password/solicitar
POST   /api/auth/reset-password/confirmar
GET    /api/auth/verify-token

GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account

GET    /api/anuncios
GET    /api/anuncios/:id
POST   /api/anuncios
PUT    /api/anuncios/:id
DELETE /api/anuncios/:id
PATCH  /api/anuncios/:id/status

GET    /api/vendedor/mis-anuncios

POST   /api/anuncios/:id/fotos
PUT    /api/anuncios/:id/fotos/reorder
DELETE /api/anuncios/:id/fotos/:fotoId

GET    /api/anuncios/buscar

POST   /api/contactos
GET    /api/vendedor/contactos
GET    /api/vendedor/estadisticas
```

---

# REQUISITOS DE CALIDAD

Todo el código debe:

- usar async/await
- usar try/catch
- ser modular
- estar comentado
- seguir buenas prácticas
- usar middlewares reutilizables
- separar lógica negocio/controladores
- usar repositories
- usar services
- estar listo para producción

---

# ENTREGA FINAL

Genera ABSOLUTAMENTE TODO el backend completo incluyendo:

- server.js
- app.js
- configuración Sequelize
- modelos
- relaciones
- controladores
- rutas
- middleware
- validaciones
- servicios
- repositories
- helpers
- utils
- seeds
- migrations
- package.json
- README.md
- .env.example
- Cloudinary config
- JWT auth
- paginación
- rate limiting
- manejo errores
- documentación

El proyecto debe quedar completamente funcional y listo para ejecutar inmediatamente después de:

```bash
npm install
npm run dev
```

No omitas archivos.

No simplifiques lógica.

No uses pseudocódigo.

Genera código real, profesional y listo para producción.