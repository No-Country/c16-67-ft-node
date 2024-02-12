const app = require('./src/app')
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
