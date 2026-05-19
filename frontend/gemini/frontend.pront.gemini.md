# ROL DEL MODELO

Actúa como un **arquitecto frontend senior especializado en React, Vite, Tailwind CSS y desarrollo de aplicaciones web modernas escalables**.

Tu tarea es construir el frontend completo, profesional, responsive y listo para producción para la plataforma:

# “Alquiler Nueva Cajamarca”

Debes desarrollar una aplicación moderna con:

- React 18+
- Vite
- Tailwind CSS
- React Router v6
- Context API
- Axios
- React Hook Form
- Yup

El proyecto debe seguir:

- Clean Architecture
- arquitectura modular
- principios SOLID
- separación de responsabilidades
- componentes reutilizables
- buenas prácticas de UX/UI
- optimización de rendimiento
- accesibilidad WCAG
- responsive design mobile-first

Todo el código generado debe ser:

- profesional
- modular
- reutilizable
- bien comentado
- escalable
- mantenible
- compatible con navegadores modernos
- listo para producción

---

# OBJETIVO GENERAL

Desarrollar un frontend completo conectado al backend de la plataforma de alquileres.

El sistema debe incluir:

- autenticación JWT
- búsqueda avanzada
- filtros dinámicos
- panel de vendedor
- publicación de anuncios
- edición de anuncios
- carga de imágenes
- contacto vía WhatsApp/correo
- dashboard privado
- integración opcional con IA Gemini Pro

Todo debe quedar listo para ejecutar inmediatamente después de:

```bash
npm install
npm run dev
```

---

# STACK TECNOLÓGICO

## Core

- React 18+
- Vite

## Routing

- React Router DOM v6

## Styling

- Tailwind CSS

## Estado Global

- Context API

## Formularios

- React Hook Form
- Yup

## HTTP

- Axios

## UI

- React Icons
- React Toastify

## Variables de entorno

- dotenv (.env)

---



# HOME (/)

Construir landing principal moderna y responsive.

Debe incluir:

## HEADER

- logo
- barra búsqueda
- botones:
  - Buscar
  - Publicar
  - Login
- menú usuario autenticado

---

## FILTROS

Implementar filtros dinámicos:

- tipo
- rango precio
- zona
- amenidades
- limpiar filtros

Actualización en tiempo real.

---

## LISTADO ANUNCIOS

Grid responsive:

- 1 columna móvil
- 2 tablet
- 3+ desktop

Cada tarjeta debe mostrar:

- foto principal
- título
- precio
- zona
- tipo
- botón ver detalles

Implementar:

- skeleton loaders
- paginación
- estados vacíos

---

## FOOTER

Debe incluir:

- enlaces
- redes sociales
- copyright
- contacto

---

# DETALLE DE ANUNCIO

Ruta:

```txt
/anuncio/:id
```

---

## GALERÍA

Implementar:

- slider
- miniaturas
- navegación
- zoom opcional

---

## INFORMACIÓN

Mostrar:

- título
- precio
- dirección
- zona
- descripción
- amenidades
- visualizaciones

---

## CONTACTO

Si no autenticado:

- botón WhatsApp
- botón correo
- mensaje registro

Si autenticado:

- mostrar teléfono
- copiar número
- abrir WhatsApp
- enviar correo

---

## ANUNCIOS RELACIONADOS

Mostrar:

- 3-4 anuncios similares

---

# REGISTRO

Ruta:

```txt
/registro
```

Formulario completo:

- email
- contraseña
- confirmar contraseña
- nombre completo
- teléfono
- foto perfil opcional
- aceptar términos

---

## VALIDACIONES

Implementar:

- email válido
- contraseña fuerte
- teléfono peruano
- errores en tiempo real
- barra fortaleza contraseña

---

## UX

- errores debajo inputs
- loading states
- toast éxito/error

---

# LOGIN

Ruta:

```txt
/login
```

Formulario:

- email
- password
- recordar sesión

Características:

- guardar JWT localStorage
- redirección automática
- manejo robusto errores

---

# DASHBOARD

Ruta protegida:

```txt
/dashboard
```

Implementar panel vendedor profesional.

---

## MENÚ DASHBOARD

- Mis anuncios
- Publicar anuncio
- Contactos
- Perfil

---

## MIS ANUNCIOS

Mostrar:

- tabla/grid
- título
- precio
- estado
- visualizaciones
- fecha
- acciones

Acciones:

- editar
- ver
- pausar
- eliminar

---

## ESTADÍSTICAS

Mostrar:

- total anuncios
- visualizaciones
- activos
- pausados

---

# PUBLICAR ANUNCIO

Ruta:

```txt
/dashboard/publicar
```

Formulario completo:

- tipo
- título
- descripción
- precio
- dirección
- zona
- amenidades
- fotos
- método contacto

---

## FOTOS

Implementar:

- drag & drop
- preview
- reordenar
- eliminar
- validaciones

Restricciones:

- mínimo 3
- máximo 15

---

## MÉTODOS CONTACTO

Opciones:

- WhatsApp
- Correo
- Teléfono
- Multicanal

---

## VALIDACIONES

- descripción mínimo 20
- teléfono válido
- imágenes válidas
- precio positivo

---

# EDITAR ANUNCIO

Ruta:

```txt
/dashboard/anuncio/:id/editar
```

Mismo formulario reutilizable.

Características:

- datos precargados
- actualización imágenes
- validación ownership

---

# PERFIL

Ruta:

```txt
/perfil
```

Formulario:

- nombre
- email readonly
- teléfono
- foto perfil
- cambiar contraseña

Acciones:

- guardar cambios
- logout
- eliminar cuenta

---

# COMPONENTES REUTILIZABLES

Crear componentes profesionales reutilizables.

---

## CardAnuncio

Props:

```js
anuncio
onClick
```

Mostrar:

- imagen
- título
- precio
- zona
- tipo

---

## Header

- logo
- búsqueda
- navegación

---

## Footer

- links
- info

---

## FormularioAlquiler

Props:

```js
initialData
onSubmit
loading
```

---

## GaleriaFotos

Slider completo reusable.

---

## FiltrosBuscador

Filtros dinámicos.

---

## ProtectedRoute

Protección autenticación.

---

# CONTEXT API

# AuthContext

Estados:

```js
user
token
isAuthenticated
loading
```

Funciones:

```js
login()
logout()
register()
getProfile()
```

Persistencia:

```js
localStorage
```

Validar token al iniciar app.

---

# AnuncioContext

Estados:

```js
anuncios
filtros
currentAnuncio
```

Funciones:

```js
fetchAnuncios()
filtrarAnuncios()
getAnuncioById()
```

---

# SERVICIOS API

Crear:

```txt
src/services/api.js
```

Endpoints:

```js
api.post('/auth/registro')
api.post('/auth/login')
api.post('/auth/reset-password/solicitar')

api.get('/users/profile')
api.put('/users/profile')

api.get('/anuncios')
api.get('/anuncios/:id')

api.post('/anuncios')
api.put('/anuncios/:id')
api.delete('/anuncios/:id')

api.patch('/anuncios/:id/status')

api.get('/vendedor/mis-anuncios')

api.post('/anuncios/:id/fotos')
api.delete('/anuncios/:id/fotos/:fotoId')

api.get('/anuncios/buscar')

api.post('/contactos')

api.get('/vendedor/contactos')
api.get('/vendedor/estadisticas')
```

---

# HOOKS PERSONALIZADOS

Crear:

## useAuth.js

Acceso AuthContext.

---

## useFetch.js

Requests HTTP reutilizables.

---

## useForm.js

Manejo formularios.

---

## useLocalStorage.js

Persistencia sesión.

---

# DISEÑO UI/UX

Diseño moderno y profesional.

---

## ESTILO VISUAL

- verde/azul profesional
- blanco
- grises neutros

---

## RESPONSIVE

Mobile-first:

- 320px+
- tablet
- desktop

---

## ANIMACIONES

- hover
- fade-in
- transiciones suaves

---

# ACCESIBILIDAD

Implementar:

- WCAG AA
- ARIA labels
- navegación teclado
- alt text imágenes
- focus states

---

# VALIDACIONES CLIENTE

Implementar Yup + React Hook Form.

Validar:

- email
- password fuerte
- teléfono Perú
- imágenes
- descripción
- precio positivo

---

# BÚSQUEDA Y FILTROS

Implementar:

- búsqueda tiempo real
- filtros dinámicos
- ordenamientos
- caché requests

---

# INTEGRACIÓN WHATSAPP

Botón:

```txt
https://wa.me/[NUMERO]
```

Mensaje automático:

```txt
Hola, me interesa este alquiler.
```

---

# INTEGRACIÓN CORREO

Botón:

```txt
mailto:[EMAIL]?subject=Consulta%20sobre%20alquiler
```

---

# NOTIFICACIONES

Usar:

```txt
React Toastify
```

Eventos:

- login
- registro
- publicar
- editar
- eliminar

Duración:

```txt
3000ms
```

---

# RENDIMIENTO

Implementar:

- lazy loading
- memoización
- optimización renders
- imágenes WebP
- code splitting
- caché requests

---

# FUNCIONALIDADES FASE 2

Preparar arquitectura para:

- favoritos
- chat interno
- ratings
- mapa geolocalizado
- historial búsquedas
- recomendaciones IA
- dark mode
- multiidioma

---


# SEGURIDAD

Implementar:

- protección rutas
- expiración sesión
- sanitización
- validación JWT frontend
- manejo errores API

---

# MANEJO DE ERRORES

Implementar:

- páginas error
- fallbacks
- retry requests
- mensajes amigables

---

# PACKAGE.JSON

Debe incluir todas las dependencias necesarias.

## Dependencias

- react
- react-dom
- react-router-dom
- axios
- react-hook-form
- yup
- @hookform/resolvers
- react-icons
- react-toastify
- tailwindcss
- postcss
- autoprefixer

---

# SCRIPTS

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---



# REQUISITOS IMPORTANTES

Todo el código debe:

- usar componentes funcionales
- usar hooks modernos
- usar async/await
- tener loading states
- manejar errores correctamente
- ser modular
- ser reusable
- estar optimizado
- estar listo producción

---

No omitas archivos.

No uses pseudocódigo.

No simplifiques lógica.

Genera código real, profesional y listo para producción.