# Backend Users API 🚀

API REST para gestión de usuarios con autenticación y operaciones CRUD completas.

## 📋 Descripción

Esta API proporciona un sistema completo de gestión de usuarios con las siguientes funcionalidades:
- Registro de usuarios con validación de datos
- Autenticación de usuarios (login)
- Operaciones CRUD completas para usuarios
- Validación de emails únicos
- Hash de contraseñas con bcrypt
- Sistema de roles
- Manejo de errores robusto

## 🛠️ Tecnologías

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Drizzle ORM** - ORM para base de datos
- **PostgreSQL** (Neon Database) - Base de datos
- **bcrypt** - Hash de contraseñas
- **dotenv** - Variables de entorno

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd backend-users
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` con:
```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
```

### 4. Ejecutar migraciones
```bash
npx tsx migrate.ts
```

### 5. Ejecutar la aplicación
```bash
# Desarrollo
npm run dev

# Producción
npm run start
```

## 📚 Documentación de Endpoints

### Base URL
```
http://localhost:3000
```

---

## 🏠 Endpoints de Sistema

### 1. Información General de la API
**GET** `/`

Obtiene información básica sobre la API.

**Response:**
```json
{
  "success": true,
  "message": "Backend Users API - CRUD de Usuarios",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "users": "/api/users",
    "health": "/health"
  }
}
```

### 2. Health Check
**GET** `/health`

Verifica el estado de salud de la API.

**Response:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2025-09-26T19:43:52.076Z",
  "uptime": 309.5268467
}
```

---

## 👤 Endpoints de Usuarios

### 3. Crear Usuario
**POST** `/api/users`

Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "miPassword123",
  "idRol": 1,
  "active": true
}
```

**Campos:**
- `name` (string, requerido): Nombre completo del usuario
- `email` (string, requerido): Email único del usuario
- `password` (string, requerido): Contraseña (mínimo 6 caracteres)
- `idRol` (number, requerido): ID del rol (1=admin, 2=user)
- `active` (boolean, opcional): Estado del usuario (default: true)

**Response Exitoso (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true,
    "idRol": 1
  }
}
```

**Errores posibles:**
- 400: Email ya registrado, datos inválidos
- 500: Error del servidor

### 4. Login de Usuario
**POST** `/api/users/login`

Autentica un usuario existente.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

**Campos:**
- `email` (string, requerido): Email del usuario
- `password` (string, requerido): Contraseña del usuario

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true,
    "idRol": 1
  }
}
```

**Errores posibles:**
- 401: Credenciales inválidas
- 400: Usuario inactivo
- 500: Error del servidor

### 5. Obtener Todos los Usuarios
**GET** `/api/users`

Obtiene la lista completa de usuarios registrados.

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "active": true,
      "idRol": 1
    },
    {
      "id": 2,
      "name": "María García",
      "email": "maria@example.com",
      "active": true,
      "idRol": 2
    }
  ],
  "count": 2
}
```

### 6. Obtener Usuario por ID
**GET** `/api/users/:id`

Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (number): ID del usuario a obtener

**Ejemplo:** `GET /api/users/1`

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true,
    "idRol": 1
  }
}
```

**Errores posibles:**
- 404: Usuario no encontrado
- 400: ID inválido

### 7. Obtener Usuario por Email
**GET** `/api/users/email/:email`

Obtiene un usuario específico por su email.

**Parámetros:**
- `email` (string): Email del usuario a obtener

**Ejemplo:** `GET /api/users/email/juan@example.com`

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true,
    "idRol": 1
  }
}
```

**Errores posibles:**
- 404: Usuario no encontrado
- 400: Email requerido

### 8. Actualizar Usuario
**PUT** `/api/users/:id`

Actualiza los datos de un usuario existente.

**Parámetros:**
- `id` (number): ID del usuario a actualizar

**Request Body (todos los campos son opcionales):**
```json
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "password": "nuevaPassword456",
  "active": false,
  "idRol": 2
}
```

**Campos opcionales:**
- `name` (string): Nuevo nombre del usuario
- `email` (string): Nuevo email (debe ser único)
- `password` (string): Nueva contraseña (mínimo 6 caracteres)
- `active` (boolean): Nuevo estado del usuario
- `idRol` (number): Nuevo rol del usuario

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "active": false,
    "idRol": 2
  }
}
```

**Errores posibles:**
- 404: Usuario no encontrado
- 400: Datos inválidos, email ya en uso
- 500: Error del servidor

### 9. Eliminar Usuario
**DELETE** `/api/users/:id`

Elimina un usuario del sistema.

**Parámetros:**
- `id` (number): ID del usuario a eliminar

**Ejemplo:** `DELETE /api/users/1`

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

**Errores posibles:**
- 404: Usuario no encontrado
- 400: ID inválido
- 500: Error del servidor

---

## 🔧 Configuración para Postman

### 1. Crear una nueva Collection
- Nombre: "Backend Users API"
- Base URL: `http://localhost:3000`

### 2. Variables de Entorno (opcional)
```json
{
  "baseUrl": "http://localhost:3000",
  "userId": "1",
  "userEmail": "test@example.com"
}
```

### 3. Headers Globales
Agregar a todas las requests:
```
Content-Type: application/json
Accept: application/json
```

### 4. Ejemplos de Requests para Postman

#### Crear Usuario
```
POST {{baseUrl}}/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "idRol": 1
}
```

#### Login
```
POST {{baseUrl}}/api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Obtener Usuario por ID
```
GET {{baseUrl}}/api/users/{{userId}}
```

#### Actualizar Usuario
```
PUT {{baseUrl}}/api/users/{{userId}}
Content-Type: application/json

{
  "name": "Updated User Name"
}
```

---

## 📝 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Credenciales inválidas |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Seguridad

- Las contraseñas se almacenan hasheadas con bcrypt
- Las respuestas nunca incluyen contraseñas hasheadas
- Validación de formato de email
- Validación de longitud mínima de contraseña (6 caracteres)
- Verificación de unicidad de emails
- Verificación de existencia de usuarios antes de actualizar/eliminar
- Hash de contraseñas con bcrypt
- Manejo de errores apropiado (404, 500, etc.)
- Middleware de CORS configurado
- Middleware de logging funcional

---

## 🗃️ Base de Datos

### Tabla: roles
```sql
CREATE TABLE roles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  role VARCHAR(25) NOT NULL
);
```

**Roles por defecto:**
- ID 1: admin
- ID 2: user

### Tabla: users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  passwordHashed VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL,
  idRol INTEGER NOT NULL REFERENCES roles(id)
);
```

---

## 🐛 Manejo de Errores

Todos los errores siguen el siguiente formato:

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos (solo en desarrollo)"
}
```

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm run start

# Compilar TypeScript
npm run build

# Linting
npm run lint
npm run lint:fix

# Formateo de código
npm run format
npm run format:fix

# Ejecutar migraciones
npx tsx migrate.ts
```

---

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, por favor crear un issue en el repositorio.

---

## 📄 Licencia

ISC License
npm run test:coverage

# Run specific test file
npm test -- --grep "user authentication"
```

## 🚀 Deployment

### Using Docker
```bash
# Build Docker image
docker build -t backend-users .

# Run container
docker run -p 3000:3000 --env-file .env backend-users
```

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment
1. Set up your production server
2. Install Node.js and dependencies
3. Configure environment variables
4. Run database migrations
5. Start the application with PM2 or similar process manager

```bash
# Using PM2
npm install -g pm2
pm2 start ecosystem.config.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Follow conventional commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Thanks to all contributors
- University project requirements
- Open source libraries used

## 📞 Support

For support, email your_email@example.com or create an issue in the repository.

---

**Note**: This is a university project for learning purposes. Please review and adapt the configuration according to your specific requirements.