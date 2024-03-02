
const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { writeService, readService, modelIds, modelNames } = container.cradle;


const Reaction = modelNames.Reaction;


const create = async(req,res) =>{
    try {
        const result = await writeService.create(Reaction, req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findOne(Reaction, id, modelIds.reactionIdId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkpetId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findFk(Reaction, id, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
    
};

const getByFkpostId = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const { id } = req.params;
        const result = await readService.findFk(Reaction, id, modelIds.postId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await writeService.update(Reaction, id,{ status: false }, modelIds.reactionId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports ={
    create,getById,_deleted, getByFkpetId, getByFkpostId
};