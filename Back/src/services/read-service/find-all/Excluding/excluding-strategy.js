const { getPagination } = require("../../../utils/pagination.utils");
const { Op } = require('sequelize');

class FindExcludingStrategy {

    constructor(mappingConfig) {
        this.secondaryModel = mappingConfig.secondaryModel; 
        this.as = mappingConfig.as;
        this.attributes = mappingConfig.attributes;
    }


    async find(model, date, whereId, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        return await model.findAll({
            where: { [whereId]: { [Op.ne]: date }, status:true},
            include: [{
                model: this.secondaryModel,
                as: this.as,
                attributes: this.attributes,
            }],
            order,
            ...pagination, 
            raw: true
        });
    }

}

module.exports = FindExcludingStrategy;