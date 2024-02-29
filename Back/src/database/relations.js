//importar todas las tablas aqui abajo
const { User } = require('./models/Users')
const { Publication } = require('./models/Publication');
const { Comment } = require('./models/Comment');
const { Pet } = require('./models/Pet');
const { Reaction } = require('./models/Reaction');
const { Save } = require('./models/Save');
const { FollowUp } = require('./models/Follow-up');
const { Followed } = require('./models/Followed');
const { Followers } = require('./models/Followers');

async function setupRelations() {

    await User.hasMany(Publication, { foreignKey: 'userId', as: 'publications' }); // Indica que un usuario puede tener muchas publicaciones
    await Publication.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    await Pet.hasMany(Publication, { foreignKey: 'petId', as: 'publication' }); // Indica que una pet puede tener muchas Publicaciones
    await Publication.belongsTo(Pet, { foreignKey: 'petId', as: 'pets' });
    
    await User.hasMany(Pet, { foreignKey: 'userId', as: 'pets' }); // Indica que un usuario puede tener muchas Pets
    await Pet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    await Publication.hasMany(Comment, { foreignKey: 'postId', as: 'comments' }); // Indica que una publicacion puede tener muchos comentarios
    await Comment.belongsTo(Publication, { foreignKey: 'postId', as: 'publication' });

    await Pet.hasMany(Comment, { foreignKey: 'petId', as: 'petcomments' }); //indica que una mascota puede hacer muchos comentarios
    await Comment.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

    await Publication.hasMany(Reaction, { foreignKey: 'postId', as: 'reaction' }); // Indica que una publicacion puede tener muchas reacciones
    await Reaction.belongsTo(Publication, { foreignKey: 'postId', as: 'publication' });

    await Pet.hasMany(Reaction, { foreignKey: 'petId', as: 'petreaction' }); //indica que una mascota puede hacer muchas reacciones
    await Reaction.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

    await Pet.belongsToMany(Publication, { through: Save, foreignKey: 'petId', as: 'savedPublications' });  //Relacion de muchos a muchos, tabla intermedia Save
    await Publication.belongsToMany(Pet, { through: Save, foreignKey: 'postId', as: 'savedByUsers' });

    await Followers.belongsToMany(Followed, { through: FollowUp, foreignKey: 'followerId', as: 'petsFollowed' }); // Relacion de muchos a muchos, tabla intermedia FollowUp
    await Followed.belongsToMany(Followers, { through: FollowUp, foreignKey: 'followedId', as: 'followers' });

    await FollowUp.belongsTo(Followers, { foreignKey: 'followerId'}); // los usamos para acceder mas facil a los followers de un usuario  
    await FollowUp.belongsTo(Followed, { foreignKey: 'followedId' }); // los usamos para acceder mas facil a los followed de un usuario
}

module.exports = setupRelations;
