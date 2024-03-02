
const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { writeService, readService, modelIds, modelNames } = container.cradle;


const Comment = modelNames.Comment;


const create = async(req,res) =>{
    try {
        const result = await writeService.create(Comment, req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req,res) =>{
    try {
        const {id} = req.params;
        const result = await writeService.update(Comment,id,req.body, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const result = await readService.find(Comment);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findOne(Comment, id, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await readService.findFk(Comment, id, modelIds.userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkpetId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findFk(Comment, id, modelIds.petId);
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
        const result = await readService.findFk(Comment, id, modelIds.postId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await writeService.update(Comment, id,{ status: false }, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports ={
    create,get,getById,update,_deleted, getByFkuserId, getByFkpetId, getByFkpostId
};