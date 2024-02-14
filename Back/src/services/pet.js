const BaseService = require('./baseService');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class PetService extends BaseService {

    constructor() {
        super(models.Pet); //al llamarlo aqui, inicializamos baseService con el modelo Publication
    }                              // esto nos ayuda que funcione con el modelo especifico y ahorrano lineas de codigo repetitiva

    async getPets(name, minAge, maxAge, isLost) {
        let conditions = { where: {}, include: [] };

        if (name) {
            conditions.where.name = {
                [Op.iLike]: `%${name}%` // Utiliza iLike para búsqueda insensible a mayúsculas
            };
        }
        if (Number(minAge) > Number(maxAge)) throw Error("la edad menor no puede ser superior a la mayor")
        // Implementa la búsqueda por rango de edad
        if (minAge && maxAge) {
            conditions.where.age = {
                [Op.gte]: minAge, // Mayor o igual que minAge
                [Op.lte]: maxAge  // Menor o igual que maxAge
            };
        } else if (minAge) {
            conditions.where.age = {
                [Op.gte]: minAge // Cuando solo especifica el límite inferior
            };
        } else if (maxAge) {
            conditions.where.age = {
                [Op.lte]: maxAge // Cuando solo especifica el límite superior
            };
        }

        // Filtrar por publicaciones de tipo "perdido"
        if (isLost) {
            conditions.include.push({
                model: models.Publication,
                as: 'publication', // Asegúrate de que este alias coincida con cómo has definido la relación
                where: { type: 'Perdido' },
                //required: true // Esto hace que la consulta sea un INNER JOIN
            });
        }

        // Si no hay condiciones de búsqueda específicas, elimina el 'where' para devolver todos los registros
        if (Object.keys(conditions.where).length === 0) {
            delete conditions.where;
        }

        return this.model.findAll(conditions);
    }
}
module.exports = PetService;
