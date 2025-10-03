const { DataTypes } = require('sequelize');
const sequelize = require('../mysql');
const Usuario = require('./Usuario');

const Tarea = sequelize.define('Tarea', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    completada: { type: DataTypes.BOOLEAN, defaultValue: false },
    usuarioId: { type: DataTypes.INTEGER }
}, { tableName: 'tareas', timestamps: false });

Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });

module.exports = Tarea;
