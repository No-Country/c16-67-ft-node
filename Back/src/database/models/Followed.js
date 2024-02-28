const { Model, DataTypes } = require('sequelize');

const FOLLOWED_TABLE = "Followed";


class Followed extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: FOLLOWED_TABLE,
            modelName: 'Followed',
            timestamps: true
        }
    }

}

const followedSchema = {
    followedId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    petId_follower: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    petId_followed: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    
}


module.exports = { Followed, followedSchema };
