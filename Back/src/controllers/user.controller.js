// const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary');
const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { modelIds, modelNames, readService, writeService } = container.cradle;
const imageUploader = container.resolve('uploadImageAndGetUrl');
const jwt = require('jsonwebtoken');


const User = modelNames.User //obtenemos el modelo que necesitamos


const create = async (req,res) => {
  try {
      const decodedToken = jwt.decode(req.body.token); // Hacemos que el token sea un objeto
      const { email, name, picture } = decodedToken; // Destructuramos la data para extraer lo que necesitamos
      const dataBody = {name,mail:email,image_url:picture}; //Normalizamos el objeto para su creación
      const result = await writeService.create(User, dataBody); //Hacemos el create
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req,res) =>{
    try {
      const {id} = req.params;
        if (req.file?.path) req.body.image_url = await imageUploader(req); //Cloudinary nos devuelve la imagen como url

        const result = await writeService.update(User,id,req.body,modelIds.userId); //Actualizamos los datos del user
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}

const lastPet = async (req,res) =>{ //Guardamos el id del ultimo pet que tenia puesto en el perfil el usuario
  try {
    const {id} = req.params;
    const {petId} = req.body
    const result = await writeService.update(User,id,{last_pet:petId},modelIds.userId); // Aqui editamos el usuario para agregar el id pet
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}


const get = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;    
    const result = await readService.find(User,page, limit); // Traemos a todos los usuarios
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await readService.findOne(User, id, modelIds.userId); // Traemos un usuario en especifico
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await writeService.update(User, id, { status: false },modelIds.userId); //Hacemos un delete logico
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
    create, get, getById, update, _deleted, lastPet
};