const UserService = require("../services/user");
const { handleGet, handleGetById, handleDeleted } = require('./base.controller');

const service = new UserService();


const create = async (req,res) => {
    try {
        const {name,mail,image_url} = req.body
        const response = await service.create({
            name,
            mail,
            image_url,
            status:true,
        });
        res.json({success: true, data: response});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const update = async (req,res) =>{
    try {
        const {id} = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({success:false,message:error.message});
    }
}


const get = async (req, res) => {
    await handleGet(req, res, service.find.bind(service));
};

const getById = async (req, res) => {
    const { id } = req.params;
    await handleGetById(req, res, service.findOne.bind(service), id);
};

const _deleted = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await handleDeleted(req, res, service.deleted.bind(service), id, body);
};

module.exports = {
    create, get, getById, update, _deleted
};