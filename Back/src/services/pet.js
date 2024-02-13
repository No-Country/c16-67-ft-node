const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
class PetService extends BaseService {

    constructor() {
        super(models.Pet); //al llamarlo aqui, inicializamos baseService con el modelo Publication
    }                              // esto nos ayuda que funcione con el modelo especifico y ahorrano lineas de codigo repetitiva
    async findPets(name, age) {
        let conditions = { where: {} };

        if (name) {
            conditions.where.name = {
                [Op.iLike]: `%${name}%` // Utiliza iLike para búsqueda insensible a mayúsculas
            };
        }
        if (age) {
            conditions.where.age = age;
        }

        // Si no hay condiciones de búsqueda específicas, elimina el 'where' para devolver todos los registros
        if (Object.keys(conditions.where).length === 0) {
            delete conditions.where;
        }

        return this.model.findAll(conditions);
    }
}
module.exports = PetService;
