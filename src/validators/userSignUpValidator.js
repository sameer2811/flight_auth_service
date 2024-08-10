const {
    StatusCodes
} = require("http-status-codes");
const errorResponse = require("../utils/common/errorReponse");

async function userSignUpValidator(req, res, next) {
    console.log("Reaching here ", req.body);
    if (!req.body.email) {
        errorResponse.message = "please mention the email field.";
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if (!req.body.password) {
        errorResponse.message = "please mention the password field.";
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    };
    next();
};
module.exports = userSignUpValidator;