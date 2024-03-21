require('dotenv').config();
const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    // redis
    urlRedis: process.env.REDIS_URL || 'redis://localhost:6379',

    //Cloudinary
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}


module.exports = { config };
