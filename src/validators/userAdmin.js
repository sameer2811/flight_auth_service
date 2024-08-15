const {
    StatusCodes
} = require("http-status-codes");
const {
    UserService
} = require("../services");
const { UserRepository } = require("../repositories");
const errorResponse = require("../utils/common/errorReponse");
const userService = new UserService(new UserRepository());


async function checkIsUserAdmin(req, res, next) {
    try {
        console.log("Sameer singh 0.0");
        if (!req.userId) {
            console.log("Sameer singh 0.1");
            errorResponse.message = "User Id is missing for checking the admin role";
            return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
        console.log("Sameer singh 0");
        const response = await userService.checkIsUserAdmin(req.userId);
        console.log("Sameer singh 1");
        if (!response) {
            errorResponse.message = "User is not authorized since he is admin";
            return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);
        }
        next();
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}
module.exports = checkIsUserAdmin;