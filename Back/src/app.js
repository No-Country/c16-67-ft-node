//---------------SERVER CONFIG-----------------
const morgan = require("morgan")
const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//ROUTER
routerApi(app);

app.get('/', (req, res) => {
    res.send('backend con NodeJS')
});


module.exports = app
