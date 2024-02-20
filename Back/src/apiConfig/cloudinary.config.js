const cloudinary = require('cloudinary').v2;

async function uploadImageAndGetUrl(filePath) {
    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(filePath);
        // Obtener la URL de la imagen cargada desde Cloudinary
        const imageUrl = result.secure_url;
        return imageUrl;
    } catch (error) {
        throw error; //mandamos el error a la función usada para que se use el respectivo catch
    }
}

module.exports = uploadImageAndGetUrl;