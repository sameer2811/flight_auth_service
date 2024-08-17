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

class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

    async fetchUserByEmailId(data) {
        try {
            const user = await User.findOne({
                where: {
                    email: data.email
                }
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    }
}

module.exports = UserRepository;