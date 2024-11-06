const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // true or false por defecto
    },
    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Fecha de creación
    },
}, {
    timestamps: false // Desactiva createdAt y updatedAt automáticos
});

module.exports = usuarios;