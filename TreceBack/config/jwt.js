const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
    return jwt.sign({ id: user.id, roleId: user.roleId,status : user.status }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;