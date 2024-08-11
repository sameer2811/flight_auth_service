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
    checkPassword
} = require("../utils/common/auth");
class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

    async signInUser(data) {
        const user = await User.findOne({
            where: {
                email: data.email
            }
        });
        // first check whether the user exist with the email or not;
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "User is not found with this email id");
        }
        // now check whether the user password is same or not
        const isPasswordMatched = checkPassword(data.password, user.password);
        return isPasswordMatched;
    }
}

module.exports = UserRepository;