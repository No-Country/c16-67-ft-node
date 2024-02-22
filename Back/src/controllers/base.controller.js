
const handleCreate = async(req,res, serviceFunction, model, dataBody) =>{
    try {
        const response = await serviceFunction(model, dataBody)
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleUpdate = async(req,res, serviceFunction, model, id, dataBody, whereId ) =>{
    try {
        const response = await serviceFunction(model,id, dataBody, whereId);
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleGet = async (req, res, serviceFunction, model,page,limit) => {
    try {
        const response = await serviceFunction(model,page,limit);
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleGetById = async (req, res, serviceFunction, model,id, whereId,page,limit) => {
    try {
        const response = await serviceFunction(model, id, whereId,page,limit);
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const handleDeleted = async (req, res, serviceFunction,model, id, dataBody, whereId) => {
    try {
        const response = await serviceFunction(model,id, dataBody, whereId);
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = { handleGet, handleGetById, handleDeleted, handleCreate, handleUpdate};