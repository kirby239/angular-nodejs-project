const { usuarios } = require('../models');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario 
exports.createUser = async (req, res) => {
    try {
        const { username, password, email, name, roleId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await usuarios.create({
            username,
            password: hashedPassword,
            email,
            name,
            roleId,
            status: true // Por defecto, el usuario estará activo
        });

        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Modificar un usuario existente
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, name, roleId, status } = req.body;

        const user = await usuarios.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        user.email = email || user.email;
        user.name = name || user.name;
        user.roleId = roleId || user.roleId;
        user.status = status !== undefined ? status : user.status;

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usuarios.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Listar todos los usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await usuarios.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Visualizar un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usuarios.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

