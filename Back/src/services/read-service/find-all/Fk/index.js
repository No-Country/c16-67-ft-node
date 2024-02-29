const { getPagination } = require("../../../utils/pagination.utils");


class FindFkDefaultStrategy {

    async find(model,id, whereId, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        return await model.findAll({ where: { [whereId]: id, status:true }, ...pagination, order});
    }

}

module.exports = FindFkDefaultStrategy;