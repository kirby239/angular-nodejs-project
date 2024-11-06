const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const roles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
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

module.exports = roles;