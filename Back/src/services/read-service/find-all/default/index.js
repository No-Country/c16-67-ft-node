const { getPagination } = require("../../../utils/pagination.utils");


class FindDefault {

    async find(model, page, limit) {
        const pagination = getPagination(page, limit);
        const order = model.rawAttributes.hasOwnProperty('createdAt') ? [['createdAt', 'DESC']] : [];
        return model.findAll({ where: {status: true }, ...pagination, order });
    }

}

module.exports = FindDefault;