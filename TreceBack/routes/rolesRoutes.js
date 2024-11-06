const express = require('express');
const router = express.Router();
const rolesController = require('../controller/rolesController');
const { authenticateRolesuperAdmin, authenticateToken } = require('../middlewares/authMiddleware');

// Ruta para listar todos los roles
//authenticateRolesuperAdmin
router.get('/list', authenticateToken, rolesController.listRoles);

module.exports = router;
