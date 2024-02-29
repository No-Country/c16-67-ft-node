const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { writeService, saveReadService, modelIds, modelNames,saveWriteService } = container.cradle;



const Save = modelNames.Save;

const create = async (req,res) => {
    try {
        const result = await saveWriteService.create(Save, req.body);
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
        const result = await saveReadService.findAllSaved(Save, id, modelIds.saveId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await writeService.update(Save, id, { status: false },modelIds.saveId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, getById, _deleted
};
