// En tu archivo de configuración Awilix (awilix.js) 📌📍
const { createContainer, asValue, asClass, asFunction } = require('awilix');

// Crea el contenedor de Awilix 
const container = createContainer();


// Requerimos Redis 📌📍
const RedisClient = require('../config/redis');
// Registramos Redis
container.register({
    redisClient: asClass(RedisClient).singleton()
})

// Requerimos Cloudinary 📌📍
const  uploadImageAndGetUrl  = require('../apiConfig/cloudinary');

// Registramos Cloudinary, pero como una función de fábrica
container.register({
    uploadImageAndGetUrl: asFunction(() => uploadImageAndGetUrl).singleton()
});
//Requerimos las constantes globales, en este caso de modelos 📌📍
const {modelIds, modelNames} = require('../database/constants');

// Ahora registramos las constantes de modelos de forma global
container.register({
    modelIds:   asValue(modelIds),
    modelNames: asValue(modelNames)
})

// Requerimos los servicios 📌📍
const PetService = require("../services/extends-service/pet");
const ReadService = require('../services/read-service');
const WriteService = require('../services/write-service');

// Ahora registramos los servicios:
container.register({
    petService:          asClass(PetService).singleton(),
    readService:         asClass(ReadService).singleton(),
    writeService:        asClass(WriteService).singleton(),
});




// Exporta el contenedor para que esté disponible en otras partes de tu aplicación
module.exports = container;
