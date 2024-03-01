const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary');
const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { modelIds, modelNames, readService, writeService } = container.cradle;


const Save = modelNames.Save;
const Publication = modelNames.Publication;

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req);

        const result = await writeService.create(Publication, { ...req.body,image_url: imageUrl });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        if (req.file?.path) req.body.image_url = await uploadImageAndGetUrl(req); //Cloudinary nos devuelve la imagen como url
        const { id } = req.params;    
        const result = await writeService.update(Publication,id, req.body, modelIds.postId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await readService.find(Publication, page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getFiltered  = async (req, res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await readService.FindExcluding(Publication,"Normal", "type", page, limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findOne(Publication, id, modelIds.postId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await readService.findFk(Publication, id, modelIds.userId); 
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkpetId = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id } = req.params;
        const result = await readService.findFk(Publication, id, modelIds.petId, page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await writeService.update(Publication, id, { status: false }, modelIds.postId);        // Actualizar/Eliminar la publicación
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getByFkpetId, getFiltered 
};
