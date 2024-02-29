const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const multer = require('multer');


// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({}); // Puedes personalizar esto según tus necesidades
const upload = multer({ storage });
//redis


router
    .get('/', userController.get)
    .get('/:id', userController.getById)
    .post('/', userController.create)
    .put('/:id',upload.single('image'), userController.update)
    .put('/lastpet/:id', userController.lastPet)
    .put('/deleted/:id', userController._deleted);

    module.exports = router;