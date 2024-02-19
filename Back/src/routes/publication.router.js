const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication.controller');

const multer = require('multer');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({}); // Puedes personalizar esto según tus necesidades
const upload = multer({ storage });


router 
    .get('/', publicationController.get)
    .get('/filtered', publicationController.getFiltered)
    .get('/:id', publicationController.getById)
    .get('/userid/:id', publicationController.getByFkuserId)
    .get('/petid/:id', publicationController.getByFkpetId)
    .post('/',upload.single('image'), publicationController.create)
    .put('/:id',upload.single('image'), publicationController.update)
    .put('/deleted/:id', publicationController._deleted)


module.exports = router;