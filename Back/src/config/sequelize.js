const { Sequelize } = require('sequelize');
const { config } = require('./config');
const setupModels = require('../database/index');


const sequelize = new Sequelize(config.urlDb
    ,
    {
        dialect: 'postgres',
        logging: false, // set to console.log to see the raw SQL queries,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // NOTA: Esto es inseguro para producción
            }
        }
    }
)

setupModels(sequelize)

module.exports = sequelize
