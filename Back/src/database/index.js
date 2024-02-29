// aqui llamaremos a todos los modelos

const { User, UserSchema } = require('./models/Users')
const { Publication, publicationSchema } = require('./models/Publication')
const { Comment, commentSchema } = require("./models/Comment")
const setupRelations = require('./relations');
const { Pet, petSchema } = require('./models/Pet');
const { Reaction, reactionSchema } = require('./models/Reaction');
const { Save,saveSchema } = require('./models/Save');
const { FollowUp, followUpSchema } = require('./models/Follow-up');
const { Followed,followedSchema } = require('./models/Followed');
const { Followers,followersSchema } = require('./models/Followers');
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

    // inicializamos del modelo Save (tabla intermedia para publication y pet)
    Save.init(saveSchema, Save.config(sequelize));

    // inicializamos del modelo Followers
    Followers.init(followersSchema, Followers.config(sequelize));

    // inicializamos del modelo Followed 
    Followed.init(followedSchema, Followed.config(sequelize));

    // inicializamos del modelo FollowUp (tabla intermedia para follower y followed)
    FollowUp.init(followUpSchema, FollowUp.config(sequelize));

    // configurar relaciones entre modelos
    await setupRelations();
}


module.exports = setupModels;
