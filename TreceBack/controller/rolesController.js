const { roles } = require('../models');
// Listar todos los roles
exports.listRoles = async (req, res) => {
    try {
        const rol = await roles.findAll();
        res.json(rol);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: 'Error fetching roles', error });
    }
};
