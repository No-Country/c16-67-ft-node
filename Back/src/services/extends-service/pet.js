
const { Op } = require('sequelize');
const { Pet } = require('../../database/models/Pet');
const ReadService = require('../read-service');



class PetService extends ReadService {

    async getPets(name,userId,page,limit) {
        const offset = (page - 1) * limit;
        let conditions = { where: {}, include: [], offset,limit};

        if (name) {
            conditions.where.name = {
                [Op.iLike]: `%${name}%` // Utiliza iLike para búsqueda insensible a mayúsculas
            };
        }
        if (userId) {
            conditions.where.userId = {
                [Op.ne]: userId 
            };
        }
        // Si no hay condiciones de búsqueda específicas, elimina el 'where' para devolver todos los registros
        if (Object.keys(conditions.where).length === 0) {
            delete conditions.where;
        }

        return Pet.findAll(conditions);
    }


}
module.exports = PetService;
