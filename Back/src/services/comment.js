const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');

class CommentService extends BaseService {

    constructor(){
        super(models.Comment, models.Pet); //al llamarlo aqui, inicializamos baseService con el modelo Publication
    }                              // esto nos ayuda que funcione con el modelo especifico y ahorrano lineas de codigo repetitiva
}
module.exports = CommentService;