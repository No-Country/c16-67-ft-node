![Group 196 (2)](https://github.com/No-Country/c16-67-ft-node/assets/159343463/f309e830-5659-4c6b-9ef4-1c566987b905)

## Tecnologías Utilizadas

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React, Vite, Tailwind CSS
- Diseño y gestión: Figma, Trello, Postman, Discord, Slack

## Características

- Gestión de mascotas (creación, edición, eliminación).
- Sistema de publicaciones para mascotas perdidas, en adopción, etc.
- Comentarios y me gusta en publicaciones.
- Seguir a otros perfiles.
- Sistema de notificaciones.
- Búsqueda en tiempo real por nombre de mascota o características rango de edad.
- Chat privado

## Inicio Rápido

Instrucciones paso a paso sobre cómo ejecutar el proyecto localmente.

### Prerrequisitos

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)

### Configuración del Entorno

```bash
git clone <URL del repositorio>
cd <nombre del directorio del proyecto>
```

### Backend

```bash
cd Back
npm install
npm start
```

### Frontend

```bash
cd Front
npm install
npm run dev
```

## Base de datos

Necesitas crear una base de datos en PostgreSQL para usar tu datos en la variable de entorno y permitir conectarte

## Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar algunas variables de entorno. A continuación, se detallan las variables necesarias para el backend y el frontend.
Crea un archivo `.env` en el directorio raíz de cada parte del proyecto (Back y Front) y añade las siguientes variables con los valores correspondientes.

en el directorio `Back`:

```plaintext
DB_USER= tuusuario
DB_PASSWORD=tucontraseña
DB_HOST=localhost
DB_NAME=tunombredebasededatos

CLOUDINARY_URL=tuurlclodinary
```

### Frontend

en el directorio `Front`:

```plaintext
VITE_USER_ID=tuIddeGoogleApi
VITE_SERVER_PRODUCTION=turServerDeProduccion
VITE_SERVER_LOCAL= http://localhost:3001
VITE_LOCATION_IQ_API_KEY = tuKeyDeLocationApi
```

## Deploys

- Server deploy: [Koyeb + ElephantSQL](https://petgram-petgram.koyeb.app/)
- App deploy: [Vercel](https://pet-gram.vercel.app/)
