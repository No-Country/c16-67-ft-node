const {Model, DataTypes} = require('sequelize');

const SAVE_TABLE = 'Save';


class Save extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: SAVE_TABLE,
            modelName: 'Save',
            timestamps: true,
        }
    }
}

const saveSchema ={
    saveId: {
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
    image_url_post:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    name_pet:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    image_url_pet:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        allowNull:false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}


module.exports = {Save, saveSchema};

