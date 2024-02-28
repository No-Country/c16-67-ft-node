const { getPagination } = require("../../../utils/pagination.utils");


class FindFkStrategy {

    constructor(mappingConfig) {
        this.secondaryModel = mappingConfig.secondaryModel; 
        this.as = mappingConfig.as;
        this.attributes = mappingConfig.attributes;
    }

    async find(model,id, whereId, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        return await model.findAll({
            where: { [whereId]: id, status:true },
            include: [{
                model: this.secondaryModel,
                as: this.as,
                attributes: this.attributes,
            }],
            ...pagination,
            raw: true
        });
    }

}

module.exports = FindFkStrategy;