
class FindOneStrategy {

    constructor(mappingConfig) {
        this.secondaryModel = mappingConfig.secondaryModel; 
        this.as = mappingConfig.as;
        this.attributes = mappingConfig.attributes;
    }

    async findOne(model, id, whereId) {
        return await model.findOne({
            where: { [whereId]: id, status:true },
            include: [{
                model: this.secondaryModel,
                as: this.as,
                attributes: this.attributes  
            }],
            raw: true
        });
    }

}

module.exports = FindOneStrategy;