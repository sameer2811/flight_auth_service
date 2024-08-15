const {
    StatusCodes
} = require("http-status-codes");
const errorResponse = require("../utils/common/errorReponse");

async function userRoleValidator(req, res, next) {
    if (!req.body.userId) {
        errorResponse.message = "please mention the userId field.";
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.role) {
        errorResponse.message = "please mention the role you want to assign.";
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    };
    next();
};
module.exports = userRoleValidator;