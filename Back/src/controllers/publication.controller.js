const PublicationService = require('../services/publication');
const { handleGet, handleGetById, handleUpdate, handleCreate, handleDeleted } = require('./base.controller');
const {modelIds, modelNames, typesPublications} = require('../constants');
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary.config');

// utilizamos los servicios que tenemos en la clase hija en (publication.service)
const service = new PublicationService();
const Publication = service.getModel(modelNames.Publication) //obtenemos el modelo que necesitamos
const Save = service.getModel(modelNames.Save)               //obtenemos el modelo que necesitamos

const create = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const dataBody = { ...req.body,image_url: imageUrl, status:true };
        await handleCreate(req, res, service.create.bind(service),Publication, dataBody);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const imageUrl = await uploadImageAndGetUrl(req.file.path);
        const { id } = req.params;
        let dataBody = {...req.body, image_url: imageUrl}
        // Verificar si existe un registro en la tabla Save para la publicacion
        const savePost = await service.findFk(Save,id,modelIds.postId); 
        // Si existe un registro en Save, intentar actualizar la información
        if (savePost?.length) await service.update(Save, id, { image_url_post: imageUrl }, modelIds.postId);

        await handleUpdate(req, res, service.update.bind(service),Publication,id, dataBody, modelIds.postId);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service),Publication);
};

const getFiltered  = async (req, res) =>{
    await handleGetById(req, res, service.findAllExcludin.bind(service), Publication,typesPublications.Normal, typesPublications.type);
}

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), Publication, id, modelIds.postId);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Publication, id, modelIds.userId);
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findFk.bind(service),Publication, id, modelIds.petId);
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar y actualizar la información en Save
        let savePost = await service.findFk.bind(Save, id, "postId");
        if (savePost.data?.length) await service.update.bind(Save, id, { status: false },modelIds.postId);
        // Actualizar/Eliminar la publicación
        await handleDeleted(req, res, service.update.bind(service),Publication, id, { status: false }, modelIds.postId);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getByFkpetId, getFiltered 
};
