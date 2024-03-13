const { config } = require('../config/config');
const { Client } = require('pg');

const client = new Client({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
})
client.connect();

module.exports = client;
