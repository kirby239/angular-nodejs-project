const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { usuarios, roles } = require('./models');
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const authenticateToken = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.POR_EVEN || 3000;

const corsOptions = {
    origin: 'http://localhost:4200', // Cambia esto por el origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permitir el envío de credenciales
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/v1', usuariosRoutes, rolesRoutes);
app.use('/api/v1/roles', rolesRoutes);
// modelos y crea las tablas en la base de datos
sequelize.sync({ force: false }) // 'force: true' elimina y vuelve a crear las tablas
    .then(() => {
        console.log('Tablas creadas correctamente en la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
