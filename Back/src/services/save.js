const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');

class SaveService extends BaseService {

    constructor() {
        super([models.Save]);
    }                             
    async findAllSaved(model,petId) {
        try {
            // Obtener los postId de las publicaciones guardadas por el animal
            const savedPublications = await model.findAll({
                where: { petId }
            });
            return savedPublications
        } catch (error) {
            return { error: true, message: error.message }
        }
    }

}
module.exports = SaveService;