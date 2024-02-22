const CommentService = require('../services/comment');
const { handleGet, handleGetById, handleUpdate, handleCreate, handleDeleted } = require('./base.controller');
const {modelIds, modelNames} = require('../constants');

// utilizamos los servicios que tenemos en la clase hija en (comment.service)
const service = new CommentService();
const Comment = service.getModel(modelNames.Comment) //obtenemos el modelo que necesitamos



const create = async(req,res) =>{
    let dataBody= {...req.body,status:true}
    await handleCreate(req, res, service.create.bind(service),Comment, dataBody);
}

const update = async (req,res) =>{
        const {id} = req.params;
        await handleUpdate(req, res, service.update.bind(service),Comment,id,req.body, modelIds.commentId);
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service), Comment);
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service),Comment, id, modelIds.commentId);
};

const getByFkuserId = async (req, res) => { 
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Comment, id, modelIds.userId);
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Comment, id, modelIds.petId);
};

const getByFkpostId = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Comment, id, modelIds.postId,page,limit);
};

const _deleted = async (req, res) => {
        const { id } = req.params;
        await handleDeleted(req, res, service.update.bind(service),Comment, id,{ status: false }, modelIds.commentId);
};

module.exports ={
    create,get,getById,update,_deleted, getByFkuserId, getByFkpetId, getByFkpostId
};