const { Model, DataTypes } = require('sequelize');

const FOLLOW_UP_TABLE = "FollowUp";


class FollowUp extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: FOLLOW_UP_TABLE,
            modelName: 'FollowUp',
            timestamps: true
        }
    }
}

const followUpSchema = {
    FollowUpId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
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


module.exports = { FollowUp, followUpSchema };
