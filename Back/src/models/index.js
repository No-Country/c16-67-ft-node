// aqui llamaremos a todos los modelos

const { User, UserSchema } = require('./Users')
const { Publication, publicationSchema } = require('./Publication')
const { Comment, commentSchema } = require("./Comment")
const setupRelations = require('./relations');
const { Pet, petSchema } = require('./Pet');
const { Reaction, reactionSchema } = require('./Reaction');

async function setupModels(sequelize) {

    //inicialización del modelo user
    User.init(UserSchema, User.config(sequelize));
    
    //inicialización del modelo Pet
    Pet.init(petSchema, Pet.config(sequelize));
    
    //inicialización del modelo Publicacion
    Publication.init(publicationSchema, Publication.config(sequelize));

    //inicialización del modelo Commer
    Comment.init(commentSchema, Comment.config(sequelize));

    //inicialización del modelo Reaction (reacciones)
    Reaction.init(reactionSchema, Reaction.config(sequelize));

    // configurar relaciones entre modelos
    await setupRelations();
}


module.exports = setupModels;
