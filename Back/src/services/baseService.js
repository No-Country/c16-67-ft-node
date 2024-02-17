// aqui se generan metodos generales que pueden utilizar todos modelos!

const { Op } = require('sequelize');
const { Publication } = require('../models/Publication');
class BaseService {
    constructor(models) {
        this.models = models;
    }

    getModelByName(modelName) {
        const model = this.models.find(model => model.options.name.singular === modelName);
        return model;
    }


    async find(model,type) {
        const selectedModel = this.getModelByName(model);
        const modelName = selectedModel.options.name.singular; //Buscamos el model correcto con el valor que nos pasan
        
        if (modelName === "Publication" || modelName === "Comment") {
            try {
                const selectedModelFk = this.getModelByName("Pet"); // Buscamos el modelo Pet en nuestros models
                const items = await selectedModel.findAll({
                    include: [{
                        model: selectedModelFk,
                        as: 'pets',
                        attributes: ['name', 'image_url'],
                        }],
                    where: type ? { type: type } : undefined, //Condición type para las consultas anidadas
                    order: [['createdAt', 'DESC']],
                    raw: true
                });
                return items;
            } catch (error) {
                throw new Error("Error al buscar los elementos: " + error.message);
            }    
        }
        let condition = {};
            if (type) {
                condition.where = { type: type };
            }
        return selectedModel.findAll(condition);    
    }


    async findFk(model,id, whereId, ) {
        const selectedModel = this.getModelByName(model);
        const modelName = selectedModel.options.name.singular;

        const modelMapping = {
            "Publication": { secondaryModel: "Pet", alias: "pets", attributes: ['name', 'image_url']},
            "Comment": { secondaryModel: "Pet", alias: "pet", attributes: ['name', 'image_url']}
        };
    
        if (modelMapping[modelName]) {
            const { secondaryModel, alias, attributes } = modelMapping[modelName];
            const selectedModelFk = this.getModelByName(secondaryModel);

            try {
                const NestedInformation = await selectedModel.findAll({
                    where: { [whereId]: id },
                    include: [{
                        model: selectedModelFk,
                        as: alias,
                        attributes: attributes,
                    }],
                    order: [['createdAt', 'DESC']],
                    raw: true
                });
                return NestedInformation;
            } catch (error) {
                throw new Error("Error al buscar información relacionada: " + error.message);
            }
        } else {
            return await selectedModel.findAll({ where: { [whereId]: id }});
        }
    }
    
    async findAll(model,id) {
        try {
            const selectedModel = this.getModelByName(model);
            const petsWithoutUserId = await selectedModel.findAll({
                where: {
                    userId: {
                        [Op.ne]: id // Filtra los registros donde userId no es igual al userId recibido
                    }
                }
            });
            return petsWithoutUserId;
        } catch (error) {
            throw new Error("Error al buscar mascotas diferentes al userId: " + error.message);
        }
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

        return this.models.findAll(options);
    }

    async findOne(model, id) {
        const selectedModel = this.getModelByName(model);
        if(model === "Publication"){
            const selectedModelFk = this.getModelByName("Pet");
            const nestedInformation = await selectedModel.findOne({
                where: { postId: id },
                include: [{
                    model: selectedModelFk, // Usamos el modelo de Pet
                    as: 'pets', // Alias de la asociación con Pet
                    attributes: ['name', 'image_url'], // Atributos de Pet que deseas incluir
                }],
                order: [['createdAt', 'DESC']],
                raw: true
            });
            return nestedInformation
        }
        return selectedModel.findByPk(id);
    }

    async create(model, data) {
        try {
            const selectedModel = this.getModelByName(model);
            
            if (model === "User"){
                let date = await selectedModel.findOrCreate({
                    where: { mail: data.mail}, // Criterio de búsqueda
                    defaults: data})
                    return  date;
            }

            let date = await selectedModel.create(data) 
            return date;
        } catch (error) {
            throw new Error("Error al buscar todos los elementos: " + error.message);
        }
    }

    async update(model,id, data, whereId) {
        try {
            const selectedModel = this.getModelByName(model);
            // Construye la condición where dinámicamente
            const whereCondition = {};
            whereCondition[whereId] = id;

            let result = await selectedModel.update(data, { where: whereCondition });
            
            if (result[0] === 1) { //validamos que se haya actualizado
                // Construye el objeto actualizado con los datos proporcionados
                const updatedObject = { ...whereCondition, ...data }; //tambien le agrego la id 
                return updatedObject;
            } else {
                throw new Error('No se pudo actualizar el objeto');
            } 
        } catch (error) {
            throw new Error("Error al actualizar: " + error.message);
        }
        // Construye la condición where dinámicamente
    }

}

module.exports = BaseService;
