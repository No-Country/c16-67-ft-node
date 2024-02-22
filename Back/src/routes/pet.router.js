const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');

const multer = require('multer');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({}); // Puedes personalizar esto según tus necesidades
const upload = multer({ storage });


router 
    .get('/', petController.get)
    .get('/:id', petController.getById)
    .get('/userid/:id', petController.getByFkuserId)
    .get('/suggestion/:id', petController.getSuggestion)
    .post('/',upload.single('image'), petController.create)
    .put('/:id',upload.single('image'), petController.update)
    .put('/deleted/:id', petController._deleted)


module.exports = router;