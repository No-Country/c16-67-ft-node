const express = require('express');
const router = express.Router();
const saveController = require('../controllers/save.controller')

router
    // .get('/', saveController.get)
    .get('/:id', saveController.getById)
    .post('/', saveController.create)
    .put('/deleted/:id', saveController._deleted);

    module.exports = router;