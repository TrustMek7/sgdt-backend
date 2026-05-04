# 🚀 SGDT Backend - NestJS

Backend moderno y escalable para el Sistema de Gestión de Dispositivos y Telecomunicaciones, construido con **NestJS**.

## ✨ Características

- ✅ **Arquitectura modular** con NestJS
- ✅ **Autenticación JWT** segura
- ✅ **Base de datos PostgreSQL** con Prisma ORM
- ✅ **Swagger/OpenAPI** documentación automática
- ✅ **Validación de DTOs** con class-validator
- ✅ **CORS** habilitado para frontend
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **Testing** con Jest

## 📋 Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── strategies/       # Estrategias de Passport
│   ├── guards/           # Guards (JWT)
│   ├── dto/              # DTOs de autenticación
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.controller.ts
├── prisma/              # Integración con Prisma ORM
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── areas/               # Módulo de áreas
├── devices/             # Módulo de dispositivos
├── device-types/        # Módulo de tipos de dispositivos
├── offices/             # Módulo de oficinas
├── reports/             # Módulo de reportes
├── common/              # Código compartido (decoradores, guards, etc)
├── app.module.ts        # Módulo raíz
├── app.controller.ts
├── app.service.ts
└── main.ts              # Punto de entrada
```

## 🔧 Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` con tus credenciales:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/sgdt_db
   JWT_SECRET=your_secure_secret_key
   JWT_EXPIRATION=7d
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3001
   ```

3. **Sincronizar base de datos con Prisma**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Cargar datos fijos de prueba**
   ```bash
   npm run db:seed
   ```

5. **Iniciar el servidor**
   ```bash
   npm run start:dev
   ```

## 📚 Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run start:dev

# Producción
npm run build
npm run start:prod

# Testing
npm run test
npm run test:watch
npm run test:cov

# Linting
npm run lint

# Formato de código
npm run format
```

## 🔐 Autenticación

### Endpoints de Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/profile` - Obtener perfil (requiere JWT)

### Usar JWT

Incluir el token en el header `Authorization`:
```
Authorization: Bearer <tu_jwt_token>
```

## 📖 Documentación API

Una vez que el servidor esté corriendo, accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

## 🗂️ Módulos Disponibles

### Areas
- `GET /areas` - Obtener todas las áreas
- `GET /areas/:id` - Obtener un área
- `POST /areas` - Crear área (requiere JWT)
- `PATCH /areas/:id` - Actualizar área (requiere JWT)
- `DELETE /areas/:id` - Eliminar área (requiere JWT)

### Devices
- `GET /devices` - Obtener todos los dispositivos
- `GET /devices/:id` - Obtener un dispositivo
- `POST /devices` - Crear dispositivo (requiere JWT)
- `PATCH /devices/:id` - Actualizar dispositivo (requiere JWT)
- `DELETE /devices/:id` - Eliminar dispositivo (requiere JWT)

### Device Types
- `GET /device-types` - Obtener tipos de dispositivos
- `POST /device-types` - Crear tipo (requiere JWT)
- `PATCH /device-types/:id` - Actualizar tipo (requiere JWT)
- `DELETE /device-types/:id` - Eliminar tipo (requiere JWT)

### Offices
- `GET /offices` - Obtener oficinas
- `POST /offices` - Crear oficina (requiere JWT)
- `PATCH /offices/:id` - Actualizar oficina (requiere JWT)
- `DELETE /offices/:id` - Eliminar oficina (requiere JWT)

### Reports
- `GET /reports` - Obtener reportes
- `POST /reports` - Crear reporte (requiere JWT)
- `PATCH /reports/:id` - Actualizar reporte (requiere JWT)
- `DELETE /reports/:id` - Eliminar reporte (requiere JWT)

## 🚀 Próximos Pasos

1. **Implementar modelos en Prisma**: Actualiza `prisma/schema.prisma` con tus modelos reales (User, Area, Device, etc)

2. **Descomentar servicios**: En cada servicio hay código comentado con ejemplos usando Prisma

3. **Agregar validaciones**: Personaliza los DTOs según tus necesidades

4. **Implementar lógica de negocio**: Reemplaza los placeholders en los servicios

5. **Tests**: Crea pruebas unitarias e integración en archivos `.spec.ts`

## 🔗 Integración con Frontend

Desde tu app React/Vue/Angular, realiza peticiones a `http://localhost:3000`:

```typescript
// Ejemplo con fetch o axios
const response = await fetch('http://localhost:3000/areas', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/sgdt_db` |
| `JWT_SECRET` | Clave secreta para JWT | `my_secret_key_123` |
| `JWT_EXPIRATION` | Expiración del JWT | `7d`, `24h`, `30d` |
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Ambiente | `development`, `production` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:3001` |

## 🐛 Troubleshooting

### "No se puede conectar a la base de datos"
- Verifica que PostgreSQL esté corriendo
- Comprueba que `DATABASE_URL` es correcto
- Ejecuta: `npx prisma migrate deploy`

### "JWT no valida"
- Asegúrate de que `JWT_SECRET` sea el mismo en producción
- Verifica el header `Authorization: Bearer <token>`

### "CORS error desde frontend"
- Actualiza `CORS_ORIGIN` en `.env`
- O configúralo dinámicamente en `main.ts`

## 📄 Licencia

ISC

## 📞 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.
