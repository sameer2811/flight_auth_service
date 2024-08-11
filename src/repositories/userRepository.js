const CrudRepository = require("./crudRepository");
const {
    User
} = require('../models/');
const {
    AppError
} = require("../utils/errors");
const {
    StatusCodes
} = require("http-status-codes");
const {
    checkPassword,
    generateJsonWebToken
} = require("../utils/common/auth");
const {
    BaseError
} = require("sequelize");
class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

    async signInUser(data) {
        try {
            const user = await User.findOne({
                where: {
                    email: data.email
                }
            });

            // first check whether the user exist with the email or not.
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "User is not found with this email id");
            }
            // now check whether the user password is same or not
            const isPasswordMatched = checkPassword(data.password, user.password);
            if (!isPasswordMatched) {
                throw new AppError(StatusCodes.NOT_FOUND, "Password is not correct with this email id");
            }
            // generate the web token and assing it back to the user.
            const jsonToken = generateJsonWebToken(data);
            return jsonToken;
        } catch (error) {
            if (error instanceof BaseError) {
                return error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }

    }
}

module.exports = UserRepository;