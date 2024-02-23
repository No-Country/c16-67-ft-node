const {app} = require('./src/app')
const sequelize = require("./src/libs/sequelize");
const  usersListener  = require('./src/pg-listeners/users');
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        usersListener() // aqui iniciamos la escucha de cambios en la bd
        console.log(`Server is running on port: ${PORT}`);
    })
})


