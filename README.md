# PETGRAM 🐾


Una red social exclusiva para mascotas, donde ellos son los protagonistas y todo se realiza desde su punto de vista. Podrán publicar imágenes, videos o reels, comentar (gruñir o growl) las publicaciones de los demás perfiles, lo sigan o no.
Además, podrán poner me gusta (dar una patita o paw).
-Habrá una sección del feed destinada a animales perdidos o en adopción, donde esas publicaciones tendrán una etiqueta según su categoría.


## Tecnologías Utilizadas

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React, Vite, Tailwind CSS
- Diseño y gestión: Figma, Trello, Postman, Discord, Slack

## Características

- Gestión de mascotas (creación, edición, eliminación).
- Sistema de publicaciones para mascotas perdidas, en adopción, etc.
- Comentarios en publicaciones.
- Búsqueda en tiempo real por nombre de mascota o características rango de edad.

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
````
### Frontend
```bash
cd Front
npm install
npm run dev
```
## Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar algunas variables de entorno. A continuación, se detallan las variables necesarias para el backend y el frontend.
Crea un archivo `.env` en el directorio raíz de cada parte del proyecto (Back y Front) y añade las siguientes variables con los valores correspondientes.

### Backend

Crea un archivo `.env` en el directorio `Back` con las siguientes variables:

```plaintext
DB_USER= tuusuario
DB_PASSWORD=tucontraseña
DB_HOST=localhost
DB_NAME=tunombredebasededatos

CLOUDINARY_URL=tuurlclodinary
```

### Frontend

Crea un archivo `.env` en el directorio `Front` con las siguientes variables:

```plaintext
VITE_APP_ID = http://localhost:3001
```

## Deploys
- Server deploy: [Render + ElephantSQL](https://server-petgram.onrender.com/)
- App deploy: [Vercel](https://pet-gram.vercel.app/)

