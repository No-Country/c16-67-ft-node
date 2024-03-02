const { modelNames } = require("../../../database/constants");


class update{
    async update(model, id, data, whereId) {
        let {dataValues} = await model.findOne({ where: { [whereId]: id } });
        const whereCondition = {};
        whereCondition[whereId] = id;
        const result = await model.update(data,{ where: whereCondition });

        if (result[0] === 1) {
            if (model === modelNames.Reaction) await modelNames.Publication.decrement('reactionsCount',{where:{postId: dataValues.postId}})
            return  { ...whereCondition, ...data };
        }
    }
    
}


module.exports = update;