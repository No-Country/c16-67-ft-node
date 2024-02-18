const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

const multer = require('multer');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({}); // Puedes personalizar esto según tus necesidades
const upload = multer({ storage });


router 
    // .get('/', commentController.get)
    // .get('/:id', commentController.getById)
    // .get('/userid/:id', commentController.getByFkuserId)
    // .get('/petid/:id', commentController.getByFkpetId)
    .get('/postid/:id', commentController.getByFkpostId)
    .post('/',upload.single('image'), commentController.create)
    .put('/:id',upload.single('image'), commentController.update)
    .put('/deleted/:id', commentController._deleted)


module.exports = router;