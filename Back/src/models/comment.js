const {Model, DataTypes} = require('sequelize');

const COMMENT_TABLE = 'Comment';


class Comment extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: COMMENT_TABLE,
            modelName: 'Comment',
            timestamps: true,
        }
    }
}

const commentSchema ={
    commentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
    }, 
    postId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    comment:{
        allowNull: false,
        type:DataTypes.STRING(500)
    },
    publication_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
}


module.exports = {Comment, commentSchema};