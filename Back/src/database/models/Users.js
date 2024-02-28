const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'User';


// Definir el modelo de la tabla User

class User extends Model {
  static config(sequelize) {
    return{
      sequelize,
      tableName:USER_TABLE,  // nombre de la tabla en la base de datos
      modelName: 'User',  // Es el nombre del modelo en Sequelize. Por defecto, Sequelize utilizará este nombre para asociarlo con el nombre de la tabla
      timestamps: false   // añade campos createdAt y updatedAt automáticamente
    }
  }
}

// Definir los campos de la tabla User 
const UserSchema = {
  userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  mail:{
    allowNull: false,
    type:DataTypes.STRING,
    unique: true
  },
  image_url:{
    type: DataTypes.TEXT,
    allowNull: false
},
  status:{
    allowNull:false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_pet:{
    type:DataTypes.UUID,
    allowNull:true,
  }
}

module.exports = {User, UserSchema};