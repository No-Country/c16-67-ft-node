const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'User';


// Definir el modelo de la tabla User

class User extends Model {
  static config(sequelize) {
    return{
      sequelize,
      tableName:USER_TABLE,  // nombre de la tabla en la base de datos
      modelName: 'User',  // Es el nombre del modelo en Sequelize. Por defecto, Sequelize utilizará este nombre para asociarlo con el nombre de la tabla
      timestamps: true   // añade campos createdAt y updatedAt automáticamente
    }
  }
}

// Definir los campos de la tabla User 
const UserSchema = {
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
    field:'name'
  },
  address:{
    allowNull:false,
    type:DataTypes.STRING,
    field: 'address'
  },
  mail:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'mail'
  },
  phone:{
    allowNull: true,
    type: DataTypes.STRING(20),
    field: 'phone'
  },
  status:{
    allowNull:false,
    type: DataTypes.BOOLEAN,
    field: 'status'
  }
}

module.exports = {User, UserSchema};