const { Sequelize } = require('sequelize');
const { config } = require('./config');
const setupModels = require('../database/index');


const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        post: config.dbPort,
        dialect: 'postgres',
        logging: false, // set to console.log to see the raw SQL queries,
    }
)

setupModels(sequelize)

module.exports = sequelize
