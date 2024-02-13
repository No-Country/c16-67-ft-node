// aqui se generan metodos generales que pueden utilizar todos modelos!

const { Op } = require('sequelize');
class BaseService {
    constructor(models) {
        this.model = models;
    }

    async find() {
        return this.model.findAll();
    }

    async findByName(name) {
        let options = {};
        if (name) {
            options = {
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` // Utiliza iLike para búsqueda insensible a mayúsculas
                    }
                }
            };
        }

        return this.model.findAll(options);
    }

    async findFk(id, date) {
        const res = await this.model.findAll({
            where: {
                [date]: id
            }
        });
        return res;
    }

    async findOne(id) {
        return this.model.findByPk(id);
    }

    async create(data) {
        let date = await this.model.create(data)
        return date;
    }

    async update(id, data) {
        const modelInstance = await this.findOne(id);
        return modelInstance.update(data);
    }

    async deleted(id, data) {
        return this.update(id, data);
    }
}

module.exports = BaseService;
