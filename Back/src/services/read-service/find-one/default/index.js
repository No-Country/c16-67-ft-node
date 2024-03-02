
class FindOneDefault {

    async findOne(model, id, whereId) {
        try {
            return await model.findOne({ where: { [whereId]: id , status:true} });
        } catch (error) {
            throw error; 
        }
    }
}

module.exports = FindOneDefault;