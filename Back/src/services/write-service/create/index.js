class create {
    async create(model, dataBody) {
        let date = await model.create(dataBody)
        return date;
    }
}

module.exports = create;