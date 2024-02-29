const WriteService = require("../write-service");

class SaveReadService {

    async findAllSaved(model,petId) {
        try {
            // Obtener los postId de las publicaciones guardadas por el animal
            return await model.findAll({where: { petId, status: true }});
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async findOneUpdate(model,id, whereId) {
        return await model.findAll({ where: { [whereId]: id }});
    }
}

class SaveWriteService {
    constructor() {
        this.writeService = new WriteService;
        this.saveReadService = new SaveReadService;
    }
    async create(model,dataBody) {

        try {
            let id = dataBody.postId
            const result = await this.saveReadService.findOneUpdate(model, id, "postId")
            const status = result.length > 0 ? result[0].dataValues.status : null;

            if(result?.length && status === false) return await this.writeService.update(model,id,{status:true}, "postId")
            if(!result.length) return await model.create(dataBody)
            throw new Error("Ninguna condición se cumplió");
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = {SaveReadService,SaveWriteService};