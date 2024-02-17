const UserService = require("../services/user");
const { handleGet, handleGetById, handleUpdate } = require('./base.controller');
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;

const service = new UserService();


const create = async (req,res) => {
    try {
        const decodedToken = jwt.decode(req.body.token);
        const { email, name, picture } = decodedToken;
        const response = await service.create("User",{
            name,
            mail:email,
            image_url:picture,
            status:true,
        });
        res.json({success: true, data: response});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const update = async (req,res) =>{
    try {

        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;

        const {id} = req.params;
        const { name } = req.body;
        const response = await service.update("User",id,{name,image_url:imageUrl}, "id");
        res.json(response);
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service),"User");
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), "User", id);
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    await handleUpdate(req, res, service.update.bind(service),"User", id, { status: false }, "id");
};

module.exports = {
    create, get, getById, update, _deleted
};