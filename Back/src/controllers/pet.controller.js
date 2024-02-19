const PetService = require('../services/pet');
const { handleGetById, handleCreate, handleDeleted, handleUpdate } = require('./base.controller');
const {modelIds, modelNames} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');

// utilizamos los servicios que tenemos en la clase hija en (pet.service)
const service = new PetService();
const Pet = service.getModel(modelNames.Pet)   //obtenemos el modelo que necesitamos
const Save = service.getModel(modelNames.Save) //obtenemos el modelo que necesitamos

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const dataBody = { ...req.body,image_url: imageUrl, status:true };
        await handleCreate(req, res, service.create.bind(service),Pet, dataBody);  
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const { id } = req.params;
        let { name } = req.body;
        let dataBody = {...req.body, image_url: imageUrl}
        // Verificar si existe un registro en la tabla Save para la mascota
        const savePet = await service.findFk(Save,id, modelIds.petId); 
        // Si existe un registro en Save, intentar actualizar la información
        if (savePet?.length) await service.update(Save,id, { name_pet: name, image_url_pet: imageUrl }, modelIds.petId);
        
        await handleUpdate(req, res, service.update.bind(service),Pet, id, dataBody, modelIds.petId);
    } catch (error) {
        // Si ocurre un error durante el proceso, retornar estado 500 con el mensaje de error
        return res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const { name, minAge, maxAge, isLost } = req.query;
        const pets = await service.getPets(name, minAge, maxAge, isLost);
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
        const { id } = req.params;
        await handleGetById(req, res, service.findOne.bind(service), Pet,id, modelIds.petId);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Pet, id, modelIds.userId);
};

const getSuggestion = async (req, res) =>{
    const {id} = req.params;
    await handleGetById(req, res, service.findAllExcludin.bind(service), Pet, id, modelIds.userId);
}

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar la información en Save
        let result = await service.findFk.bind(Save, id, modelIds.petId);
        //  si existe, lo cambia
        if (result.data?.length) await service.update(Save, id, { status: false }, modelIds.petId);
        // Actualizar la publicación
        await handleDeleted(req, res, service.update.bind(service),Pet, id, { status: false }, modelIds.petId);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getSuggestion, handleUpdate
};
