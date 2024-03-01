const {Model, DataTypes} = require('sequelize');

const REACTION_TABLE = 'Reaction';


class Reaction extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: REACTION_TABLE,
            modelName: 'Reaction',
            timestamps: true,
        }
    }
}

const reactionSchema ={
    reactionId: {
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
    status:{
        allowNull:false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}


module.exports = {Reaction, reactionSchema};
