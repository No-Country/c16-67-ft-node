const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { petService, modelIds, modelNames, readService, writeService} = container.cradle;
const uploadImageAndGetUrl = container.resolve('uploadImageAndGetUrl');

const service = petService;
const Pet = modelNames.Pet;

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req);
        const result = await writeService.create(Pet, {...req.body,image_url: imageUrl});
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        if (req.file?.path && req.file.path !== '') req.body.image_url = await uploadImageAndGetUrl(req); //Cloudinary nos devuelve la imagen como url
        const { id } = req.params;
        const result = await writeService.update(Pet, id, req.body, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const { name, userId } = req.query;
        const result = await service.getPets(name,userId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id, } = req.params;
        const result = await readService.findOne( Pet,id, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const { id } = req.params;
        const result = await readService.findFk(Pet, id, modelIds.userId,page,limit);
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
        const result = await readService.FindExcluding(Pet, id, modelIds.userId,page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        await writeService.update(Pet, id, { status: false }, modelIds.petId); // Actualizar la publicación
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getSuggestion
};
