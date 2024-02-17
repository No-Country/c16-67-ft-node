const PetService = require('../services/pet');
const { handleGet, handleGetById, handleUpdate, getByIdFk } = require('./base.controller');


const cloudinary = require('cloudinary').v2;

const service = new PetService();


const create = async (req, res) => {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;

        const response = await service.create("Pet",{
            ...req.body,
            image_url: imageUrl, // Pasa la URL de la imagen
            status:true
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
        let { name } = req.body;
    
        // Actualizar la información de la mascota en la tabla Pet
        const responsePetUpdate = await service.update("Pet", id, {
            ...req.body,
            image_url: imageUrl // Pasa la URL de la imagen
        }, "petId");
    
        // Verificar si existe un registro en la tabla Save para la mascota
        const savePet = await service.findFk("Save",id, "petId"); 

        // Si existe un registro en Save, intentar actualizar la información
        if (savePet && savePet.length > 0) {
            try {
                await service.update("Save",id, { name_pet: name, image_url_pet: imageUrl }, "petId");
                // Si la actualización en Save es exitosa, retornar estado 200 con la respuesta de la actualización de Pet
                return res.status(200).json(responsePetUpdate);
            } catch (error) {
                // Si la actualización en Save falla, retornar estado 500
                return res.status(500).send({ success: false, message: 'No se pudo actualizar la información en Save.' });
            }
        }
    
        // Si no existe un registro en Save, retornar estado 200 con la respuesta de la actualización de Pet
        return res.status(200).json(responsePetUpdate);
    
    } catch (error) {
        // Si ocurre un error durante el proceso, retornar estado 500 con el mensaje de error
        return res.status(500).send({ success: false, message: error.message });
    }
}


const get = async (req, res) => {
    try {
        const { name, minAge, maxAge, isLost } = req.query;
        const pets = await service.getPets(name, minAge, maxAge, isLost);
        res.json(pets);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), "Pet",id);
};

const getByFkuserId = async (req, res) => {
    const { id } = req.params;
    await getByIdFk(req, res, service.findFk.bind(service),"Pet", id, "userId");
};

const _deleted = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizar la publicación
        const updatedPublication = await service.update("Pet", id, { status: false }, "petId");

        // Verificar y actualizar la información en Save
        const savePost = await service.findFk("Save", id, "petId");
        if (savePost && savePost.length > 0) {
            await service.update("Save", id, { status: false }, "petId");
        }

        // Enviar respuesta al cliente con la publicación actualizada
        return res.status(200).json(updatedPublication);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create, get, getById, update, _deleted, getByFkuserId
};
