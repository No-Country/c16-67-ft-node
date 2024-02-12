const express = require('express');
const userRouter = require('./user.router');
const newLocal = './publication.router';
const publicationRouter = require(newLocal)
const petRouter = require('./pet.router')

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/publication', publicationRouter);
    router.use('/pet',petRouter)
}


module.exports = routerApi;