const { DataTypes } = require('sequelize');
const sequelize = require('../mysql'); // tu conexión a MySQL

const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('usuario', 'administrador'),
    defaultValue: 'usuario'
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
