const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');

class PublicationService extends BaseService {

    constructor() {
        super([models.Publication, models.Pet, models.Save]);
    }                             

}
module.exports = PublicationService;