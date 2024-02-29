class update{
    async update(model, id, data, whereId) {
        console.log(model,id,data,whereId)
        const whereCondition = {};
        whereCondition[whereId] = id;
        const result = await model.update(data,{ where: whereCondition });
        if (result[0] === 1) {
            const updatedObject = { ...whereCondition, ...data };
            return updatedObject;
        }
    }
    
}


module.exports = update;