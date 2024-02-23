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
        allowNull:true,
    }, 
    petId:{
        type:DataTypes.UUID,
        allowNull:true,
    },
    postId:{
        type:DataTypes.UUID,
        allowNull:true, 
    },
    comment:{
        allowNull: false,
        type:DataTypes.STRING(500)
    },
    image_url:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
    allowNull:false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
    }
}


module.exports = {Comment, commentSchema};
