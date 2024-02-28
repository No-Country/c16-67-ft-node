const { getPagination } = require("../../../utils/pagination.utils");

const { Op } = require('sequelize');

class FindExcludingDefault {

    async find(model, date, whereId, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        return await model.findAll({
            where: { [whereId]: { [Op.ne]: date }, status:true},
            order,
            ...pagination,
        });
    }

}

module.exports = FindExcludingDefault;