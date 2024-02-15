const PublicationService = require('../services/publication');
const { handleGet, handleGetById, handleDeleted, getByIdFk } = require('./base.controller');

const cloudinary = require('cloudinary').v2;

const service = new PublicationService();


const create = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;
        let { userId, petId, description, image_url, type } = req.body

        const response = await service.create({
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

        let { description, publication_date, image_url, type, status } = req.body
        const { id } = req.params;

        const response = await service.update(id, {
            description,
            publication_date,
            image_url: imageUrl,
            type, 
            status: true,
        });
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const { type } = req.query
        await handleGet(req, res, service.find.bind(service), type);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), id);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service), id, "userId");
};

const getByFkpetId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service), id, "petId");
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await handleDeleted(req, res, service.deleted.bind(service), id, body);
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId, getByFkpetId
};
