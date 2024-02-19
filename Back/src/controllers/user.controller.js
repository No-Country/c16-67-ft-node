const UserService = require("../services/user");
const { handleGet, handleGetById, handleUpdate,handleCreate,handleDeleted } = require('./base.controller');
const {modelIds, modelNames} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');
const jwt = require('jsonwebtoken');

// utilizamos los servicios que tenemos en la clase hija en (user.service)
const service = new UserService();
const User = service.getModel(modelNames.User) //obtenemos el modelo que necesitamos

const create = async (req,res) => {
    try {
        const decodedToken = jwt.decode(req.body.token);
        const { email, name, picture } = decodedToken;
        const dataBody = {name,mail:email,image_url:picture,status:true};
        await handleCreate(req, res, service.create.bind(service),User, dataBody);
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const update = async (req,res) =>{
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const {id} = req.params;
        const { name } = req.body;
        await handleUpdate(req, res, service.update.bind(service),User,id,{name,image_url:imageUrl},modelIds.userId);
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}

const lastPet = async (req,res) =>{
    const {id} = req.params;
    const {petId} = req.body
    console.log(id,petId)
    await handleUpdate(req, res, service.update.bind(service),User,id,{last_pet:petId},modelIds.userId);
}


const get = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;    
    await handleGet(req, res, service.find.bind(service),User,page, limit);
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), User, id, modelIds.userId);
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    await handleDeleted(req, res, service.update.bind(service),User, id, { status: false },modelIds.userId);
};

module.exports = {
    create, get, getById, update, _deleted, lastPet
};