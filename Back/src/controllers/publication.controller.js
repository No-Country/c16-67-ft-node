const PublicationService = require('../services/publication');
const {modelIds, modelNames, typesPublications} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');

// utilizamos los servicios que tenemos en la clase hija en (publication.service)
const service = new PublicationService();
const Publication = service.getModel(modelNames.Publication) //obtenemos el modelo que necesitamos
const Save = service.getModel(modelNames.Save)               //obtenemos el modelo que necesitamos

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);

        const result = await service.create(Publication, { ...req.body,image_url: imageUrl });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const { id } = req.params;
        
        const savePost = await service.findFk(Save,id,modelIds.postId);  // Verificar si existe un registro en la tabla Save para la publicacion
        if (savePost?.length) await service.update(Save, id, { image_url_post: imageUrl }, modelIds.postId); // Si existe un registro en Save, intentar actualizar la información
        
        const result = await service.update(Publication,id, {...req.body, image_url: imageUrl}, modelIds.postId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await service.find(Publication, page,limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getFiltered  = async (req, res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await service.findAllExcludin(Publication,typesPublications.Normal, typesPublications.type, page, limit);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findOne(Publication, id, modelIds.postId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkuserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findFk(Publication, id, modelIds.userId); 
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const getByFkpetId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findFk(Publication, id, modelIds.petId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        let savePost = await service.findFk(Save, id, modelIds.postId); // Verificar y actualizar la información en Save
        if (savePost?.length) await service.update(Save, id, { status: false },modelIds.postId);        // Actualizar/Eliminar la publicación de Save

        const result = await service.update(Publication, id, { status: false }, modelIds.postId);        // Actualizar/Eliminar la publicación
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getByFkpetId, getFiltered 
};
