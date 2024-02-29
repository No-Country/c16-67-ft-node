const { User, UserSchema } = require('../models/Users')
const { Publication, publicationSchema } = require('../models/Publication')
const { Comment, commentSchema } = require("../models/Comment")
const { Pet, petSchema } = require('../models/Pet');
const { Reaction, reactionSchema } = require('../models/Reaction');
const { Save, saveSchema } = require('../models/Save');


const modelIds = {
    postId: Object.keys(publicationSchema)[0],
    userId: Object.keys(UserSchema)[0],
    petId: Object.keys(petSchema)[0],
    commentId: Object.keys(commentSchema)[0],
    saveId: Object.keys(saveSchema)[0],
    reactionId: Object.keys(reactionSchema)[0]
};

const modelNames = {
    Publication: Publication,
    User: User,
    Pet: Pet,
    Comment: Comment,
    Save: Save,
    Reaction: Reaction,
};

module.exports = {modelNames, modelIds};