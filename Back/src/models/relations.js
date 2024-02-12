//importar todas las tablas aqui abajo
const { User } = require('./Users')
const { Publication } = require('./Publication');
const { Comment } = require('./Comment')



async function setupRelations() {

    await User.hasMany(Publication, { foreignKey: 'userId', as: 'publications' }); // Indica que un usuario puede tener muchas publicaciones
    await Publication.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    await Publication.hasMany(Comment, { foreignKey: 'publicationId', as: 'comments' }); // Indica que una publicacion puede tener muchos comentarios
    await Comment.belongsTo(Publication, { foreignKey: 'publicationId', as: 'publication' });

    await User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' }); // Indica que un usuario puede tener/hacer muchos comentarios
    await Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    // Puedes agregar más relaciones aquí usando await
}

module.exports = setupRelations;
