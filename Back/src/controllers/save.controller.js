const SaveService = require("../services/save");
const {modelIds, modelNames} = require('../constants');

// utilizamos los servicios que tenemos en la clase hija en (save.service)
const service = new SaveService();
const Save = service.getModel(modelNames.Save) //obtenemos el modelo que necesitamos

const create = async (req,res) => {
    try {
        const result = await service.create(Save, req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20; 
        const result = await service.findAllSaved(Save, id, modelIds.saveId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.update(Save, id, { status: false },modelIds.saveId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, getById, _deleted
};