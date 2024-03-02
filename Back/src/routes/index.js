const express = require('express');
const userRouter = require('./user.router');
const publicationRouter = require('./publication.router');
const petRouter = require('./pet.router');
const commentRouter = require('./comment.router');
const saveRouter = require('./save.router')
const reactionRouter = require('./reaction.router');
function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/publication', publicationRouter);
    router.use('/pet',petRouter);
    router.use('/comment',commentRouter);
    router.use('/save', saveRouter);
    router.use('/reaction', reactionRouter);
}


module.exports = routerApi;