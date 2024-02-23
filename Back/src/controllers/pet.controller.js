const PetService = require('../services/pet');
const {modelIds, modelNames} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');

// utilizamos los servicios que tenemos en la clase hija en (pet.service)
const service = new PetService();
const Pet = service.getModel(modelNames.Pet)   //obtenemos el modelo que necesitamos
const Save = service.getModel(modelNames.Save) //obtenemos el modelo que necesitamos

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);

        const result = await service.create(Pet, {...req.body,image_url: imageUrl});
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const { id } = req.params;

        const savePet = await service.findFk(Save,id, modelIds.petId);   // Verificar si existe un registro en la tabla Save para la mascota
        if (savePet?.length) await service.update(Save,id, { name_pet: req.body.name, image_url_pet: imageUrl }, modelIds.petId); // Si existe un registro en Save, intentar actualizar la información
        
        const result = await service.update(Pet, id, {...req.body, image_url: imageUrl}, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const { name } = req.query;
        const result = await service.getPets(name,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findOne( Pet,id, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findFk(Pet, id, modelIds.userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getSuggestion = async (req, res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const {id} = req.params;
        const result = await service.findAllExcludin(Pet, id, modelIds.userId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        
        let result = await service.findFk(Save, id, modelIds.petId); // Verificar la información en Save
        if (result?.length) await service.update(Save, id, { status: false }, modelIds.petId); //  si existe, lo cambia
        
        await service.update(Pet, id, { status: false }, modelIds.petId); // Actualizar la publicación
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getSuggestion
};
