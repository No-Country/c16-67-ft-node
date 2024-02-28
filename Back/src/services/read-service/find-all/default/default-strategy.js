const { getPagination } = require("../../../utils/pagination.utils");

class FindStrategy {

    constructor(mappingConfig) {
        this.secondaryModel = mappingConfig.secondaryModel; 
        this.as = mappingConfig.as;
        this.attributes = mappingConfig.attributes;
    }

    async find(model, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        const items = await model.findAll({
            where: {status: true },
            include: [{ 
                model: this.secondaryModel,
                as: this.as,
                attributes: this.attributes  
            }],
            order,
            ...pagination,
            raw: true
        });
    
        return items;
    }

}

module.exports = FindStrategy;