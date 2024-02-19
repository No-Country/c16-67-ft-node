const {Model, DataTypes} = require('sequelize');

const PET_TABLE= "Pet";


class Pet extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: PET_TABLE,
            modelName: 'Pet',
            timestamps: false
        }
    }

}

const petSchema = {
    petId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING,
        field:'name'
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field: 'age'
    },
    address:{
        allowNull:false,
        type:DataTypes.STRING,
        field: 'address'
    },
    description:{
        type:DataTypes.STRING(500),
        allowNull:false
    },
    image_url:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        allowNull:false,
        type: DataTypes.BOOLEAN,
        field: 'status'
    }
}


module.exports = {Pet, petSchema};
