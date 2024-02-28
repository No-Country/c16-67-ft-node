const container = require('../config/awilix'); // Importa el contenedor de Awilix
const { redisClient } = container.cradle; // Obtiene la instancia de redisClient

/**
 * Guarda una publicación en la caché de Redis
 * @param {string} publicationId - El ID de la publicación
 * @param {Object} publicationData - Los datos de la publicación
 */
const cachePublication = async (publicationId, publicationData) => {
    try {
        await redisClient.hSet('publications', publicationId, JSON.stringify(publicationData));
        console.log(`Publicación con ID ${publicationId} almacenada en caché.`);
    } catch (error) {
        console.error('Error al almacenar la publicación en la caché:', error);
    }
};

/**
 * Obtiene una publicación de la caché de Redis
 * @param {string} publicationId - El ID de la publicación
 * @returns {Promise<Object|null>} Los datos de la publicación o null si no se encuentra
 */
const getCachedPublication = async (publicationId) => {
    try {
    const publicationData = await redisClient.hGet('publications', publicationId);
        if (publicationData) {
            return JSON.parse(publicationData);
        }
    return null;
    } catch (error) {
        console.error('Error al obtener la publicación de la caché:', error);
    return null;
    }
};

/**
 * Actualiza una publicación en la caché de Redis
 * @param {string} publicationId - El ID de la publicación
 * @param {Object} updatedPublicationData - Los datos actualizados de la publicación
 */
const updateCachedPublication = async (publicationId, updatedPublicationData) => {
    try {
        await redisClient.hSet('publications', publicationId, JSON.stringify(updatedPublicationData));
        console.log(`Publicación con ID ${publicationId} actualizada en la caché.`);
    } catch (error) {
        console.error('Error al actualizar la publicación en la caché:', error);
    }
};

module.exports = {
    cachePublication,
    getCachedPublication,
    updateCachedPublication,
};