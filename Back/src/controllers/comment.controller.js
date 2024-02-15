const CommentService = require('../services/comment');
const { handleGet, handleGetById, handleDeleted, getByIdFk} = require('./base.controller');

const cloudinary = require('cloudinary').v2;

const service = new CommentService();


const create = async(req,res) =>{
    try {
        // // Subir la imagen a Cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        // // Obtener la URL de la imagen cargada desde Cloudinary
        // const imageUrl = result.secure_url;

        let {userId, petId, postId, comment, image_url} = req.body
        const response = await service.create({
            userId, 
            petId,
            postId,
            comment,
            image_url, 
            status:true
        });
        console.log(response," LA DATA HECHA ")
        res.json({success: true, data: response});
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}

const update = async (req,res) =>{
    try {
        // // Subir la imagen a Cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        // // Obtener la URL de la imagen cargada desde Cloudinary
        // const imageUrl = result.secure_url;
        const {id} = req.params;
        
        let {comment, image_url} = req.body
        const response = await service.update(id,{
            comment,
            image_url, 
            status:true
        });
        res.json(response);
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service));
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), id);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service), id, "userId");
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service), id, "petId");
};

const getByFkpostId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service), id, "postId");
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await handleDeleted(req, res, service.deleted.bind(service), id, body);
};

module.exports ={
    create,get,getById,update,_deleted, getByFkuserId, getByFkpetId, getByFkpostId
};