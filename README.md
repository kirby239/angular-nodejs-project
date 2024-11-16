# Aplicación de Autenticación con roles y CRUD con Angular y Node.js

Este proyecto es una aplicación web full-stack desarrollada con **Angular 18** en el frontend , **Node.js 18** en el backend y **Postgresql 16**. Incluye funcionalidades esenciales como autenticación de usuarios (registro, inicio de sesión, recuperación de contraseña vía correo electrónico) y un CRUD para gestionar datos de los usuarios.

---

## Funcionalidades

### Autenticación
- **Registro de Usuarios**: Permite a los usuarios crear una cuenta.
- **Inicio de Sesión**: Autentica a los usuarios mediante un sistema seguro basado en tokens.
- **Gestión de Tokens**: Generación y validación de JWT (JSON Web Token) para sesiones.
- **Recuperación de Contraseña**: Envío de correos electrónicos para restablecer la contraseña utilizando **Nodemailer**.

### CRUD
- Operaciones de **Crear, Listar, Visualizar ,Actualizar y Eliminar** datos de los usuarios esto se aplica para el rol **SuperAdmin** y solo **Listar,Visualizar** para el rol de **User** .
- Gestión de perfiles de usuario a través de una API segura controlado los errores con sus repetivo estatus.

---

## Tecnologías Utilizadas

### Frontend
- **Angular 18**: Desarrollo de interfaces dinámicas y responsivas.
- **Angular Material** (opcional): Componentes predefinidos para la UI.
- **Bootstrap CSS** (opcional): Para personalizar estilos.

### Backend
- **Node.js 18**: Ejecución del servidor.
- **Express.js**: Framework para enrutamiento y middleware.
- **Nodemailer**: Servicio de correos electrónicos para recuperación de contraseñas.
- **JSON Web Token (JWT)**: Autenticación segura basada en tokens.
- **PostgreSQL** (o cualquier base de datos): Persistencia de datos.

---

## API Endpoints

### Login

**URL:** `POST http://localhost:3000/auth/login`

**Body:**
```json
{
    "username": "superadmin",
    "password": "superadmin"
}
```

### Register

**URL:** `POST http://localhost:3000/auth/register`

**Body:**
```json
{
    "username": "example",
    "password": "example"
    "email":"example@gmail.com",
    "name":"exampl"
}
```
