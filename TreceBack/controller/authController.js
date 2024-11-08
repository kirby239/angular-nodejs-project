const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { usuarios } = require('../models');
const generateToken = require('../config/jwt');
const rolesDefault = require('../model/rolesDefaullt');
//aca creas un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { username, password, email, name } = req.body;
        const existingUser = await usuarios.findOne({
            where: {
                [Op.or]: [{ username }, { email }] // Busca si hay coincidencias en username y email
            }
        });
        if (existingUser) {
            // Si ya existe un usuario con el mismo username o email
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Si no existe, proceder a crear el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await usuarios.create({ username, password: hashedPassword, email, name, roleId: rolesDefault.roles.GENERICO, }); //rol por defecto es generico
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
/*exports.register = async (req, res) => {
    try {
        const { username, password, email, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await usuarios.create({ username, password: hashedPassword, email, name, roleId: 2, }); //rol por defecto es generico
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};*/
//aca solo te logeas
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usuarios.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        if (!user.status) return res.status(403).json({ message: 'User is disabled' });
        const { id, roleId, status } = user.dataValues;
        //const token = generateToken(user);
        const token = generateToken({ id, roleId, status });
        const rolId = roleId
        res.json({ token, rolId });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}; 