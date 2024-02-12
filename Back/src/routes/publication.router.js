const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication.controller');

const multer = require('multer');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({}); // Puedes personalizar esto según tus necesidades
const upload = multer({ storage });


router 
    .get('/', publicationController.get)
    .get('/:id', publicationController.getById)
    .get('/post-user/:id', publicationController.getByIdUserPost)
    .post('/',upload.single('image'), publicationController.create)
    .put('/:id',upload.single('image'), publicationController.update)
    .put('/deleted/:id', publicationController._delete)


module.exports = router;