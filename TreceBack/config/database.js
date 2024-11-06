const { Sequelize } = require('sequelize');
require('dotenv').config();

// configuracion  de la conexión a PostgreSQL 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  logging: false, // Desactiva el logging de SQL en consola
});

module.exports = sequelize;