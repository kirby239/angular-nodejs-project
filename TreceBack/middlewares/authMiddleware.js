const jwt = require('jsonwebtoken');
const { usuarios, roles } = require('../models');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //falta el token o no se porporciono
    if (!token) return res.status(403).json({ message: 'Token missing or not provided' });
    //return res.sendStatus(403);

    //Acceso no autorizado: token no válido

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorized access: Invalid token' });
        // return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authenticateRolesuperAdmin = async (req, res, next) => {
    try {
        const { id, roleId } = req.user;

        if (!id || !roleId) return res.sendStatus(403);

        // Verifica si el rol es SuperAdmin (por ejemplo, roleId === 1)
        if (roleId !== roles.GENERICO) return res.status(403).json({ message: 'Access denied' });

        // Verifica si el usuario todavía existe en la base de datos
        const user = await usuarios.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        next(); // Usuario tiene acceso, continuar con la solicitud
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { authenticateRolesuperAdmin, authenticateToken };
