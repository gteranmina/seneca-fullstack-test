# 🚀 SENECA Fullstack Test - Sistema de Gestión de Usuarios

Este proyecto es una aplicación web completa desarrollada como prueba técnica para el puesto de **Desarrollador Fullstack en SENECA-CORPORACION S.A.S.**

Cuenta con frontend en React y backend en Node.js + Express, e implementa funcionalidades completas de autenticación y gestión de usuarios.

---

## 🧠 Funcionalidades principales

- 🔐 Inicio de sesión (con registro de última sesión)
- 📝 Registro de usuarios
- ✅ Activación de cuenta por correo
- 🔁 Recuperación de contraseña
- 🧾 Actualización de datos del usuario (nombre, apellido, dirección, fecha de nacimiento)
- 👤 Usuario por defecto al iniciar el servidor
- 🔓 Cierre de sesión
- 📦 Separación frontend/backend
- 🎨 Estilizado con Bootstrap

---

## 🌐 Demo local

### 1. Clona este repositorio

```
git clone https://github.com/gteranmina/seneca-fullstack-test.git
cd seneca-fullstack-test
```

---

### 2. Configura el backend

#### 📁 Entra a la carpeta del backend:

```
cd backend
```

#### 📄 Copia el archivo `.env.example` como `.env`:

```
cp .env.example .env
```

> ⚠️ Este `.env` ya contiene la URI de **una base de datos de pruebas pública**.

#### 📦 Instala las dependencias:

```
npm install
```

#### ▶️ Inicia el backend:

```
node server.js
```

---

### 3. Configura el frontend

#### 📁 En una terminal separada:

```
cd frontend
npm install
npm start
```

La app se abrirá automáticamente en `http://localhost:3000`

---

## 🧪 Usuario de prueba

Puedes iniciar sesión con el usuario por defecto:

- **Correo:** admin@seneca.com  
- **Contraseña:** admin123

O registrarte con uno nuevo (recibirás un correo para activar tu cuenta).

---

## 📁 Estructura del proyecto

```
seneca-fullstack-test/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example 
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│   └── index.js
└── README.md
```

---

## 📦 Tecnologías usadas

**Frontend:**
- React
- Bootstrap
- React Router

**Backend:**
- Express
- Node.js
- MongoDB + Mongoose
- JWT (Autenticación)
- Nodemailer (Correo electrónico)
- Bcrypt (Hash de contraseñas)
- dotenv

---

## 🔒 Seguridad y buenas prácticas

- El archivo `.env` real **no está incluido** en el repositorio.
- Se incluye un `.env.example` con valores de prueba para facilitar la ejecución.
- La base de datos usada es de pruebas, por ende **será eliminada tras el proceso de evaluación**.
- Las contraseñas se guardan con hashing seguro (`bcrypt`).

---

## 👨‍💻 Autor

**Gustavo René Terán Mina**  
GitHub: [gteranmina](https://github.com/gteranmina)
