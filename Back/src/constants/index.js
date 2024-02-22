const modelIds = {
    postId: 'postId',
    userId: 'userId',
    petId: 'petId',
    commentId: 'commentId',
    saveId: 'saveId',
    reactionId: 'reactionId'
};

const typesPublications ={ // se usi para filtrar el feed de lost/in adoption, para no renderizar normales
    type: "type",
    Normal: "Normal",
    Adopcion: "Adopcion",
    Perdido: "Perdido"
}

const modelNames = {
    Publication: 'Publication',
    User: 'User',
    Pet: 'Pet',
    Comment: 'Comment',
    Save: 'Save',
    Reaction: 'Reaction'
};

module.exports = {modelIds, modelNames, typesPublications, typesPublications};