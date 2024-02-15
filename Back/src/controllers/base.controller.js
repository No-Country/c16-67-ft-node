const handleGet = async (req, res, serviceFunction, type) => {
    try {
        const response = await serviceFunction(type);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleGetById = async (req, res, serviceFunction, id) => {
    try {
        const response = await serviceFunction(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByIdFk = async (req,res, serviceFunction, id,date) =>{
    try {
        const {id} = req.params;
        const response = await serviceFunction(id, date);
        res.json(response);
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}

const handleDeleted = async (req, res, serviceFunction, id, body) => {
    try {
        const response = await serviceFunction(id, body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { handleGet, handleGetById, handleDeleted, getByIdFk};