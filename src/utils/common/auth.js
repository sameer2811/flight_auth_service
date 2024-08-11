const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/serverConfig');

function checkPassword(userPassWord, userEncryptedPassword) {
    return bcrypt.compareSync(userPassWord, userEncryptedPassword);
}

function generateJsonWebToken(data) {
    return jwt.sign(data, serverConfig.JWT_SECRET_KEY);
}

module.exports = {
    checkPassword,
    generateJsonWebToken
};