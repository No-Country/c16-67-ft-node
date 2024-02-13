const PetService = require('../services/pet');
const { handleGet, handleGetById, handleDeleted, getByIdFk } = require('./base.controller');


const cloudinary = require('cloudinary').v2;

const service = new PetService();


const create = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;

        let { userId, name, age, address, description, image_url } = req.body
        const response = await service.create({
            userId,
            name,
            age,
            address,
            description,
            image_url: imageUrl,
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
        const { id } = req.params;

        let { name, age, address, description, image_url, status } = req.body
        const response = await service.update(id, {
            name,
            age,
            address,
            description,
            image_url: imageUrl,
            status
        });
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const { name, minAge, maxAge } = req.query;
        const pets = await service.getPets(name, minAge, maxAge);
        res.json(pets);
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

const _deleted = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await handleDeleted(req, res, service.deleted.bind(service), id, body);
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId
};
