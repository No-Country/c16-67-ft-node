const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reaction.controller');



router 
    .get('/:id', reactionController.getByFkpostId)
    .post('/', reactionController.create)
    .put('/deleted/:id', reactionController._deleted)


module.exports = router;