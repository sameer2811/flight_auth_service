const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/serverConfig');
const {
    AppError
} = require('../errors');
const {
    StatusCodes
} = require('http-status-codes');
const {
    BaseError
} = require('sequelize');

function checkPassword(userPassWord, userEncryptedPassword) {
    return bcrypt.compareSync(userPassWord, userEncryptedPassword);
}

function generateJsonWebToken(data) {
    return jwt.sign(data, serverConfig.JWT_SECRET_KEY, {
        expiresIn: serverConfig.JWT_EXPIRY_TIME
    });
}

function verifyJwtToken(token) {
    try {
        if (!token) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Token Is Missing for the authentication');
        }
        return jwt.verify(token, serverConfig.JWT_SECRET_KEY);
    } catch (error) {
        if (error instanceof BaseError) {
            return error;
        }
        throw new AppError(StatusCodes.BAD_REQUEST, error)
    }

}

module.exports = {
    checkPassword,
    generateJsonWebToken,
    verifyJwtToken
};