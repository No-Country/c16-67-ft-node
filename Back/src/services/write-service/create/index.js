const { User } = require("../../../database/models/Users");

class create {
    async create(model, dataBody) {
        if(model === User){
            let data = await User.findOne({ where: { mail: dataBody.mail } });
            if(!data || data === null){
                return await model.create(dataBody)
            }  
            return data.dataValues
        }
        return await model.create(dataBody)
    }
}

module.exports = create;