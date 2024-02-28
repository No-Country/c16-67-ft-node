const { Model, DataTypes } = require('sequelize');

const FOLLOWERS_TABLE = "Followers";


class Followers extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: FOLLOWERS_TABLE,
            modelName: 'Followers',
            timestamps: true
        }
    }

}

const followersSchema = {
    followersId: {
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


module.exports = { Followers, followersSchema };
