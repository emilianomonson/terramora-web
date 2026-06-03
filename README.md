# Terramora Web

Proyecto web inmobiliario desarrollado con Angular, Spring Boot, PostgreSQL, JWT y Cloudinary.

## Estructura del proyecto

```txt
Terramora/
├── terramora-frontend/
└── terramora-backend/
```

## Tecnologías utilizadas

### Frontend

* Angular
* TypeScript
* Tailwind CSS
* JWT
* Cloudinary optimized images

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT
* PostgreSQL
* Cloudinary
* Maven

## Variables de entorno del backend

Crear las variables usando como referencia:

```txt
terramora-backend/.env.example
```

Variables necesarias:

```env
SERVER_PORT=8080

DB_URL=jdbc:postgresql://localhost:5432/terramora_db
DB_USERNAME=postgres
DB_PASSWORD=your_database_password

JWT_SECRET=your_super_long_secure_jwt_secret
JWT_EXPIRATION_MS=86400000

FRONTEND_URL=http://localhost:4200

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Ejecutar backend

Desde la carpeta del backend:

```bash
cd terramora-backend
```

Ejecutar con IntelliJ IDEA o con Maven:

```bash
mvn spring-boot:run
```

Backend local:

```txt
http://localhost:8080
```

## Ejecutar frontend

Desde la carpeta del frontend:

```bash
cd terramora-frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
ng serve -o
```

Frontend local:

```txt
http://localhost:4200
```

## Rutas principales

```txt
/                       Home
/propiedades            Catálogo público
/propiedades/:id        Detalle de propiedad
/admin/login            Login administrador
/admin/propiedades      Panel administrador
```

## Seguridad

El panel administrador usa autenticación con JWT.

Las rutas públicas de propiedades son accesibles sin login.

Las acciones protegidas requieren token JWT:

```txt
POST /api/properties
PUT /api/properties/{id}
DELETE /api/properties/{id}
POST /api/uploads/images
```

## Imágenes

Las imágenes se suben a Cloudinary desde el backend y se guardan como URLs en PostgreSQL.

El frontend optimiza imágenes usando transformaciones de Cloudinary:

```txt
f_auto
q_auto
w/h optimizados
```

## Importante

No subir a GitHub:

```txt
.env
contraseñas reales
JWT_SECRET real
CLOUDINARY_API_SECRET real
node_modules
target
dist
.angular
```

## Estado del proyecto

Funcionalidades implementadas:

```txt
Home inmobiliario
Catálogo público de propiedades
Detalle de propiedad
WhatsApp dinámico
Panel administrador
Login con JWT
CRUD de propiedades
Subida de imágenes a Cloudinary
Preview y orden de imágenes
Filtros y paginación en admin
Filtros y paginación en catálogo público
Optimización de imágenes Cloudinary
```
