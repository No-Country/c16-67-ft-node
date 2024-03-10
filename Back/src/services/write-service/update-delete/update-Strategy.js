const { Save } = require("../../../database/models/Save");
const ReadService = require("../../read-service");

class updateStrategy {
    constructor() {
        this.service = new ReadService();
    }

    async update(model, id, data, whereId) {
        const whereCondition = {};
        whereCondition[whereId] = id;
        const record = await this.service.findFk(Save, id, whereId);
            if (record?.length) {
                await Save.update(data, { where: whereCondition });
            }
        const result = await model.update(data,{ where: whereCondition });
        if (result[0] === 1) {
            const updatedObject = { ...whereCondition, ...data }; //tambien le agrego la id 
            return updatedObject;
        }
    }
} 


module.exports = updateStrategy;