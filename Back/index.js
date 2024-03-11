const { app } = require("./src/app");
const container = require("./src/config/awilix");
const sequelize = require("./src/config/sequelize");
const usersListener = require("./src/pg-listeners/users");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

const { redisClient } = container.cradle;

const isRedisHealthy = async () => {
  try {
    const pong = await redisClient.ping();
    console.log("Redis is healthy:", pong); // Debería imprimir 'Redis is healthy: PONG'
    return;
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    return;
  }
};

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    isRedisHealthy();
    usersListener(); // aqui iniciamos la escucha de cambios en la bd
    console.log(`Server is running on port: ${PORT}`);
  });
});

module.exports = app
