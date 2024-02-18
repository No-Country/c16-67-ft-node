const PublicationService = require('../services/publication');
const { handleGet, handleGetById, getByIdFk, handleUpdate } = require('./base.controller');

const cloudinary = require('cloudinary').v2;

const service = new PublicationService();


const create = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;
        let { userId, petId, description, type } = req.body

        const response = await service.create("Publication",{
            userId,
            petId,
            description,
            image_url: imageUrl,
            type,
            status: true
        });
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;

        let { description, publication_date, type } = req.body
        const { id } = req.params;

        const response = await service.update("Publication",id,{
            description,
            publication_date,
            image_url: imageUrl,
            type, 
            status: true,
        }, "postId");

         // Verificar si existe un registro en la tabla Save para la publicacion
        const savePost = await service.findFk("Save",id,"postId"); 

         // Si existe un registro en Save, intentar actualizar la información
        if (savePost && savePost.length > 0) {
            try {
                await service.update("Save", id, { image_url_post: imageUrl }, "postId");
                return res.status(200).json(response);
            } catch (error) {
                return res.status(500).send({ success: false, message: 'No se pudo actualizar la información en Save.' });
            }
        }
        return res.status(200).json(response);    
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const { type } = req.query
        await handleGet(req, res, service.find.bind(service),"Publication", type);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), "Publication", id);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Publication", id, "userId");
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Publication", id, "petId");
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizar la publicación
        const updatedPublication = await service.update("Publication", id, { status: false }, "postId");

        // Verificar y actualizar la información en Save
        const savePost = await service.findFk("Save", id, "postId");
        if (savePost && savePost.length > 0) {
            await service.update("Save", id, { status: false }, "postId");
        }

        // Enviar respuesta al cliente con la publicación actualizada
        return res.status(200).json(updatedPublication);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getByFkpetId
};
