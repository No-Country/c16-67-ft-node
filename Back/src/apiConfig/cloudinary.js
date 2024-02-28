const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
cloud_name: 'dnwt4nr29', 
api_key: '889177556872531', 
api_secret: 'yXMT73bV0f8LENrYWv3wlSFigqw' 
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