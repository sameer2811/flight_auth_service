const {
    StatusCodes
} = require("http-status-codes");
const {
    UserService
} = require("../services");
const {
    UserRepository
} = require("../repositories");

const successResponse = require("../utils/common/successResponse");
const errorResponse = require("../utils/common/errorReponse");

const userService = new UserService(new UserRepository());
async function createUserSignUpController(req, res, next) {
    try {
        let data = {
            ...req.body
        };
        const response = await userService.signUpUser(data);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}

async function createUserSignInController(req, res, next) {
    try {
        let data = {
            ...req.body
        };
        const response = await userService.signInUser(data);
        console.log(response);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}

async function assignUserRoleController(req, res, next) {
    try {
        let data = {
            ...req.body
        };
        const response = await userService.assignRoleToUser(data);
        console.log(response);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.status).json(errorResponse);
    }
}

module.exports = {
    createUserSignUpController,
    createUserSignInController,
    assignUserRoleController
};