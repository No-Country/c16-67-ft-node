//importar todas las tablas aqui abajo
const { User } = require('./Users')
const { Publication } = require('./Publication');
const { Comment } = require('./Comment');
const { Pet } = require('./Pet');
const { Reaction } = require('./Reaction');

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

}

module.exports = setupRelations;
