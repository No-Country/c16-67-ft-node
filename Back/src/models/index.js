// aqui llamaremos a todos los modelos

const { User, UserSchema } = require('./Users')
const { Publication, publicationSchema } = require('./Publication')
const { Comment, commentSchema } = require("./comment")
const setupRelations = require('./relations');


function setupModels(sequelize) {

    //inicialización del modelo user
    User.init(UserSchema, User.config(sequelize));

    //inicialización del modelo Publicacion
    Publication.init(publicationSchema, Publication.config(sequelize));


    //inicialización del modelo Commer
    Comment.init(commentSchema, Comment.config(sequelize));
    // configurar relaciones entre modelos
    setupRelations();
}


module.exports = setupModels;
