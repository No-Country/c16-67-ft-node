const SaveService = require("../services/save");
const { handleUpdate } = require('./base.controller');

const service = new SaveService();


const create = async (req,res) => {
    try {
        // Crear una nueva entrada en la tabla Save para guardar la relación
        await service.create("Save", { ...req.body, status:true });

        res.status(200).json({ message: 'Publicación guardada exitosamente.' });
    } catch (error) {
        console.error('Error al guardar la publicación:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

const getById = async (req, res) => {
    const  petId  = req.params.id;
    try {
        // Buscar las publicaciones guardadas por el pet específico
        const savedPublications = await service.findByPetId(petId);

        res.status(200).json(savedPublications);
    } catch (error) {
        console.error('Error al obtener las publicaciones guardadas por el pet:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    await handleUpdate(req, res, service.update.bind(service),"Save", id, { status: false }, "saveId");
};

module.exports = {
    create, getById, _deleted
};