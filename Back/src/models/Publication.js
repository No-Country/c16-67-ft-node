const {Model, DataTypes} = require('sequelize');

const PUBLICATION_TABLE= "Publication";


class Publication extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: PUBLICATION_TABLE,
            modelName: 'Publication',
            timestamps: true
        }
    }
}


const publicationSchema = {
    postId:{
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
    type:{
        type:DataTypes.STRING(10),
        allowNull:false,
        field: 'type'
    },
    description:{
        type:DataTypes.STRING(500),
        allowNull:false
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'address'
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


module.exports = {Publication, publicationSchema};