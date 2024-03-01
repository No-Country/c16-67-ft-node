const { Model, DataTypes } = require('sequelize');

const PET_TABLE = "Pet";


class Pet extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: PET_TABLE,
            modelName: 'Pet',
            timestamps: true
        }
    }

}

const petSchema = {
    petId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    num_seguidos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    num_seguidores: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}


module.exports = { Pet, petSchema };
