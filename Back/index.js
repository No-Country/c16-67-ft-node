const app = require('./src/app')
const sequelize = require("./src/libs/sequelize")
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })
})
