const handleGet = async (req, res, serviceFunction, model,type) => {
    try {
        const response = await serviceFunction(model,type);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleGetById = async (req, res, serviceFunction, model,id) => {
    try {
        const response = await serviceFunction(model, id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByIdFk = async (req,res, serviceFunction,model, id,whereId) =>{
    try {
        const response = await serviceFunction(model,id, whereId);
        res.json(response);
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}

const handleUpdate = async (req, res, serviceFunction,model, id, body, whereId) => {
    try {
        const response = await serviceFunction(model,id, body, whereId);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { handleGet, handleGetById, handleUpdate, getByIdFk};