const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');

class SaveService extends BaseService {

    constructor() {
        super([models.Save]);
    }                             
    async findByPetId(petId) {
        try {
            // Obtener los postId de las publicaciones guardadas por el animal
            const savedPublications = await models.Save.findAll({
                where: { petId }
            });
            return savedPublications;
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while retrieving saved publications');
        }
    }

}
module.exports = SaveService;