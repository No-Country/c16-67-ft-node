// aqui se generan metodos generales que pueden utilizar todos modelos!

const { Op } = require('sequelize');
class BaseService {
    constructor(models, models2) {
        this.model = models;
        this.model2 = models2
    }

    async find(type) {
        const modelName = this.model.options.name.singular;
        let condition = {};
            if (type){
                condition.where = { type: type };
                return this.model.findAll(condition);
            }
        if (modelName === "Publication" || modelName === "Comment") {
            try {
                const items = await this.model.findAll({
                    include: [{
                        model: this.model2,
                        as: 'pets',
                        attributes: ['name', 'image_url'],
                    }],
                    raw: true
                });
            return items;
            } catch (error) {
                throw new Error("Error al buscar los elementos: " + error.message);
            }    
        }
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
        const modelName = this.model.options.name.singular;
        if (modelName === "Publication" || modelName === "Comment") {
            try {
                const comments = await this.model.findAll({
                    where: {
                        [date]: id
                    },
                    include: [
                        {
                            model: this.model2, // Modelo Pet
                            as: 'pet',
                            attributes: ['name', 'image_url'],
                        }
                    ],
                    raw: true
                });
                return comments;
            } catch (error) {
                throw new Error("Error al buscar los comentarios: " + error.message);
            }
        }
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

        if (data.mail){
            let date = await this.model.findOrCreate({
                where: { mail: data.mail}, // Criterio de búsqueda
                defaults: data})
                return  date;
        }else{
            let date = await this.model.create(data)
            return date;
        }
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
