const { modelNames } = require("../../../database/constants");
const validateCreation = require("../../utils/validateForCreate");

class create {
    async create(model,dataBody) {
        
        const information = await validateCreation(model,dataBody)
        if(information?.userId) return information // Si el usuario ya existe retornamos el usuario

        if(information !== false){
            const whereCondition = {};
            whereCondition[information.whereId] = information.id;
            await information.model.update(information.data, { where: whereCondition });
            return await modelNames.Publication.increment('reactionsCount',{where:{postId: dataBody.postId}})
        } 

        let result =  await model.create(dataBody)
        if(model === modelNames.Reaction) await modelNames.Publication.increment('reactionsCount',{where:{postId:dataBody.postId}})

        return result
    }
}

module.exports = create;