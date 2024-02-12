const express = require('express');
const userRouter = require('./user.router');
const newLocal = './publication.router';
const publicationRouter = require(newLocal)


function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/publication', publicationRouter);
}


module.exports = routerApi;