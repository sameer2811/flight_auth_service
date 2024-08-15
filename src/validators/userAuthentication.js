const {
    StatusCodes
} = require("http-status-codes");
const {
    verifyJwtToken
} = require("../utils/common/auth");
const errorResponse = require("../utils/common/errorReponse");

async function checkIsUserAuthenticated(req, res, next) {
    try {
        console.log("Reaching here");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
        if (!token) {
            errorResponse.error = "No JWT Token Provided for the same!";
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
        console.log("Reaching here 2");

        const tokenDetails = verifyJwtToken(token);
        console.log("Reaching here 3");
        if (tokenDetails) {
            req.userId = tokenDetails.id;
            next();
        } else {
            errorResponse.error = "Invalid Jwt Token Provided for the same!";
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
    } catch (error) {
        console.log(error);
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

module.exports = checkIsUserAuthenticated;