const cloudinary = require('cloudinary').v2;
const { config } = require('../config/config');

cloudinary.config({ 
cloud_name: config.cloud_name, 
api_key: config.api_key, 
api_secret: config.api_secret 
});

async function uploadImageAndGetUrl(req) {
    try {
        // Extraer la ruta del archivo de req.file.path
        const filePath = req.file.path;
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(filePath);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;
        return imageUrl;
    } catch (error) {
        throw error;
    }
}

module.exports = uploadImageAndGetUrl;