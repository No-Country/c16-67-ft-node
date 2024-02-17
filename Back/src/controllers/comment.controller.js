const CommentService = require('../services/comment');
const { handleGet, handleGetById, handleDeleted, getByIdFk} = require('./base.controller');

const cloudinary = require('cloudinary').v2;

const service = new CommentService();


const create = async(req,res) =>{
    try {
        const response = await service.create("Comment",{
            ...req.body,
            status:true
        });
        res.json({success: true, data: response});
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}

const update = async (req,res) =>{
    try {
        const {id} = req.params;

        const response = await service.update("Comment", id,{
            ...req.body,
            status:true
        },"commentId");
        res.json({success: true, data: response});
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service), "Comment");
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service),"Comment", id);
};

// todos los getbyfk son find anidados, ya que ademas de buscar en la tabla comment, debo de buscar datos del pet para renderizar en el front
const getByFkuserId = async (req, res) => { 
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Comment", id, "userId");
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Comment", id, "petId");
};

const getByFkpostId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Comment", id, "postId", );
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        await handleDeleted(req, res, service.deleted.bind(service),"Comment", id,{ status: false }, "commentId");
        res.json({success: true, data: "Eliminado con exito"});
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
};

module.exports ={
    create,get,getById,update,_deleted, getByFkuserId, getByFkpetId, getByFkpostId
};