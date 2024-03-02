const { modelNames } = require("../../database/constants")

async function validateCreation(model,dataBody) {

    if(model === modelNames.User){ // Validamos si el usuario ya esta en el modelo, si no lo esta lo creamos
        let data = await model.findOne({ where: { mail: dataBody.mail } });
        if(!data || !data?.userId) return false
        return data.dataValues
    }
    if(model === modelNames.Save){
        let information = await model.findOne({ where: { postId: dataBody.postId, petId: dataBody.petId }});
        if(!information || !information?.saveId) return false 
        return { model, id: information.dataValues.postId, data:{status:true}, whereId: "postId"}
    }
    if(model === modelNames.Reaction){
        let information = await model.findOne({ where: {
            postId: dataBody.postId,
            petId: dataBody.petId 
        }});
        if(!information || !information?.reactionId) return false 
        return {
            model, 
            whereId: "reactionId",
            id: information.dataValues.reactionId,
            data: {
            status: true 
            }
        }
    }
    return false;
}

module.exports = validateCreation;