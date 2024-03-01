const { modelNames } = require("../../database/constants")

async function validateCreation(model,dataBody) {

    if(model === modelNames.User){ // Validamos si el usuario ya esta en el modelo, si no lo esta lo creamos
        let data = await model.findOne({ where: { mail: dataBody.mail } });
        if(!data || !data?.userId) return false
        return data.dataValues
    }
    if(model === modelNames.Save){
        let data = await model.findOne({ where: { postId: dataBody.postId } });
        if(!data || !data?.saveId) return false 

        return {model: model, id: dataBody.postId, date:{status:true}, whereId: "postId"}
    }
    if(model === modelNames.Reaction){
        let {dataValues} = await model.findOne({ where: {
            postId: dataBody.postId,
            petId: dataBody.petId 
        }});
        if(!dataValues || !dataValues?.reactionId) return false 
        return {
            model, 
            whereId: "reactionId",
            id: dataValues.reactionId,
            data: {
            status: true 
            }
        }
    }
    return false;
}

module.exports = validateCreation;