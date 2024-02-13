const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');

class PublicationService extends BaseService {

    constructor() {
        super(models.Publication); //al llamarlo aqui, inicializamos baseService con el modelo Publication
    }                              // esto nos ayuda que funcione con el modelo especifico y ahorrano lineas de codigo repetitiva

    async getPublications(type) {
        let condition = {};

        if (type) condition.where = { type: type };

        return models.Publication.findAll(condition);
    }
}
module.exports = PublicationService;
