const CommentService = require('../services/comment');
const {modelIds, modelNames} = require('../constants');

// utilizamos los servicios que tenemos en la clase hija en (comment.service)
const service = new CommentService();
const Comment = service.getModel(modelNames.Comment) //obtenemos el modelo que necesitamos



const create = async(req,res) =>{
    try {
        let dataBody= {...req.body,status:true}
        const result = await service.create(Comment, dataBody);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req,res) =>{
    try {
        const {id} = req.params;
        const result = await service.update(Comment,id,req.body, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const result = await service.find(Comment);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findOne(Comment, id, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await service.findFk(Comment, id, modelIds.userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkpetId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findFk(Comment, id, modelIds.petId);
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
        const result = await service.findFk(Comment, id, modelIds.postId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.update(Comment, id,{ status: false }, modelIds.commentId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports ={
    create,get,getById,update,_deleted, getByFkuserId, getByFkpetId, getByFkpostId
};