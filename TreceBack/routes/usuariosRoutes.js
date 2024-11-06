const express = require('express');

const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { authenticateRolesuperAdmin, authenticateToken } = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo usuario
router.post('/create', authenticateToken, authenticateRolesuperAdmin, usuarioController.createUser);

// Ruta para modificar un usuario existente
router.put('/update/:id', authenticateToken, authenticateRolesuperAdmin, usuarioController.updateUser);

// Ruta para eliminar un usuario
router.delete('/delete/:id', authenticateToken, authenticateRolesuperAdmin, usuarioController.deleteUser);

// Ruta para listar todos los usuarios
//authenticateRolesuperAdmin
router.get('/list', authenticateToken, usuarioController.listUsers);

// Ruta para visualizar un usuario por ID
router.get('/view/:id', authenticateToken, authenticateRolesuperAdmin, usuarioController.getUserById);

//forgot-password
router.post('/forgot-password', usuarioController.forgotPassword);
//new password
router.put('/new-password', authenticateToken, usuarioController.newPassword);


module.exports = router;