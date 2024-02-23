const UserService = require("../services/user");
const {modelIds, modelNames} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');
const jwt = require('jsonwebtoken');

// utilizamos los servicios que tenemos en la clase hija en (user.service)
const service = new UserService();
const User = service.getModel(modelNames.User) //obtenemos el modelo que necesitamos

const create = async (req,res) => {
    try {
      const decodedToken = jwt.decode(req.body.token); // Hacemos que el token sea un objeto
      const { email, name, picture } = decodedToken; // Destructuramos la data para extraer lo que necesitamos
      const dataBody = {name,mail:email,image_url:picture}; //Normalizamos el objeto para su creación
      const result = await service.create(User, dataBody); //Hacemos el create
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req,res) =>{
    try {
      const {id} = req.params;
        const imageUrl = await uploadImageAndGetUrl(req.file.path); //Cloudinary nos devuelve la imagen como url
        const result = await service.update(User,id,{name:req.body.name,image_url:imageUrl},modelIds.userId); //Actualizamos los datos del user
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}

const lastPet = async (req,res) =>{ //Guardamos el id del ultimo pet que tenia puesto en el perfil el usuario
  try {
    const {id} = req.params;
    const {petId} = req.body
    const result = await service.update(User,id,{last_pet:petId},modelIds.userId); // Aqui editamos el usuario para agregar el id pet
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}


const get = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;    
    const result = await service.find(User,page, limit); // Traemos a todos los usuarios
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.findOne(User, id, modelIds.userId); // Traemos un usuario en especifico
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.update(User, id, { status: false },modelIds.userId); //Hacemos un delete logico
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
    create, get, getById, update, _deleted, lastPet
};