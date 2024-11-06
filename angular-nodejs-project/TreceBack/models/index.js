const usuarios = require('./usuarios');
const roles = require('./roles');
const sequelize = require('../config/database');

// un usuario puede tener un rol
usuarios.belongsTo(roles, { foreignKey: 'roleId' });
roles.hasMany(usuarios, { foreignKey: 'roleId' });

module.exports = { sequelize, usuarios, roles };