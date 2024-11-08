const { sendResetPasswordEmail } = require('../config/mailer');
const { usuarios } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const generateToken = require('../config/jwt');
const { JWT_SECRET } = process.env;

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

        const existingUser = await usuarios.findOne({
            where: {
                [Op.or]: [{ username }, { email }],// Busca si hay coincidencias en username y email
                id: { [Op.ne]: id }
            }
        });
        if (existingUser) {
            // Si ya existe un usuario con el mismo username o email
            return res.status(400).json({ message: 'Username or email already exists' });
        }

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


// Función Forgot Password
exports.forgotPassword = async (req, res) => {
    const { username } = req.body
    let userEmail = "";
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    const message = 'Check your email for a link to reset your password'
    let verificationLink = "";
    try {
        const user = await usuarios.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'username not found' });
        }
        const { id, roleId, status, email } = user.dataValues;
        userEmail = email;
        const token = generateToken({ id, roleId, status });
        verificationLink = process.env.FRONT_URL + `/new-password/${token}`
    } catch (error) {
        return res.status(404).json({ message: 'Error email' });
    }

    //sedEmail
    try {
        await sendResetPasswordEmail(userEmail, verificationLink);

    } catch (error) {
        return res.status(400).json({ message: 'Something goes wrong! ' })
    }

    return res.status(200).json({ message });//verificationLink
};
exports.newPassword = async (req, res) => {
    const { newPassword, username } = req.body


    // const resetToken = req.headers.reset ;
    if (!newPassword || !username) {
        return res.status(400).json({ message: 'All the fileds are required' });
    }
    //falta validar el token 
    try {
        const user = await usuarios.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'username not found' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.json({ message: 'new Password changed!' })

    } catch (error) {
        return res.status(401).json({ message: 'Something goes wrong!' });

    }
};




