const {
    StatusCodes
} = require("http-status-codes");
const {
    verifyJwtToken
} = require("../utils/common/auth");
const errorResponse = require("../utils/common/errorReponse");

async function checkIsUserAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

        if (!token) {
            errorResponse.error = "No JWT Token Provided for the same!";
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
        const isValidToken = verifyJwtToken(token);
        if (isValidToken) {
            next();
        } else {
            errorResponse.error = "Invalid Jwt Token Provided for the same!";
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
};

module.exports = {
    checkIsUserAuthenticated
};