// aqui se generan metodos generales que pueden utilizar todos modelos!

const { Op } = require('sequelize');

class BaseService {
    constructor(models) {
        this.models = models;
    }

    getModel(modelo) {
        try {
            const models = this.models.find(model => model.options.name.singular === modelo);
            return models; 
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }


    async find(model,page, limit) {
        try {
            if(!page?.length && !limit?.length){
                return model.findAll();   
            }
            const offset = (page - 1) * limit;
            const modelName = model.options.name.singular; //Buscamos el model correcto con el valor que nos pasan
            const modelMapping = {
                "Publication": { secondaryModel: "Pet", as: "pets", attributes: ['name', 'image_url']},
                "Comment": { secondaryModel: "Pet", as: "pet", attributes: ['name', 'image_url']}
            };
            if (modelMapping[modelName]) {
                const { secondaryModel, as, attributes } = modelMapping[modelName];
                const selectedModelFk = this.getModel(secondaryModel);

                    const items = await model.findAll({
                        include: [{
                            model: selectedModelFk,
                            as: as,
                            attributes: attributes,
                            }],
                        order: [['createdAt', 'DESC']],
                        offset, // <-- Paginación
                        limit, // <-- Paginación 
                        raw: true
                    });
                    return items; 
            }
            return model.findAll({offset,limit});    
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }


    async findFk(model,id, whereId, ) {
        try {
            const modelName = model.options.name.singular;
            const modelMapping = {
                "Publication": { secondaryModel: "Pet", as: "pets", attributes: ['name', 'image_url']},
                "Comment": { secondaryModel: "Pet", as: "pet", attributes: ['name', 'image_url']}
            };
            if (modelMapping[modelName]) {
                const { secondaryModel, as, attributes } = modelMapping[modelName];
                const selectedModelFk = this.getModel(secondaryModel);

                const NestedInformation = await model.findAll({
                    where: { [whereId]: id },
                    include: [{
                        model: selectedModelFk,
                        as: as,
                        attributes: attributes,
                    }],
                    order: [['createdAt', 'DESC']],
                    raw: true
                });
                return NestedInformation;
            } else {
                return await model.findAll({ where: { [whereId]: id }});
            }
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }   
    }
    

    async findAllExcludin(model,date,whereId,page,limit) {
        try {
            const offset = (page - 1) * limit;
            const petsWithoutUserId = await model.findAll({
                where: {
                    [whereId]: {
                        [Op.ne]: date 
                    }
                },
                order: [['createdAt', 'DESC']],
                offset, // <-- Paginación
                limit, // <-- Paginación 
            });
            return petsWithoutUserId;
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }


    async findOne(model, id, whereId) {
        try {
            if(model === "Publication"){
                const selectedModelFk = this.getModel("Pet");
                const nestedInformation = await model.findOne({
                    where: { [whereId]: id },
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
            console.log(whereId)
            return model.findOne({where: { [whereId]: id }});  
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }

    async create(model, dataBody) {
        try {
            if (model === "User"){
                let date = await model.findOrCreate({
                    where: { mail: data.mail}, // Criterio de búsqueda
                    defaults: data})
                    return  date;
            }
            let date = await model.create(dataBody) 
            return date;
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }

    async update(model,id, data, whereId) {
        try {
            // Construye la condición where dinámicamente
            const whereCondition = {};
            whereCondition[whereId] = id;
            let result = await model.update(data, { where: whereCondition });
            if (result[0] === 1) { //validamos que se haya actualizado
                // Construye el objeto actualizado con los datos proporcionados
                const updatedObject = { ...whereCondition, ...data }; //tambien le agrego la id 
                return updatedObject;
            } else {
                throw error; //mandamos el error a la función usada para que se use el respectivo catch
            } 
        } catch (error) {
            throw error; //mandamos el error a la función usada para que se use el respectivo catch
        }
    }

}

module.exports = BaseService;
