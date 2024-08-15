const {
    Role
} = require('../models/');
const {
    AppError
} = require("../utils/errors");
const {
    StatusCodes
} = require("http-status-codes");
const {
    BaseError
} = require("sequelize");
const CrudRepository = require("./crudRepository");

class RoleRepository extends CrudRepository {

    constructor() {
        super(Role);
    }

    async getRoleByName(data) {
        try {
            const role = await Role.findOne({
                where: {
                    name: data.roleName
                }
            });
            // first check whether the user exist with the role or not.
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, "No Role is  found with this Role Name");
            }
            return role;
        } catch (error) {
            if (error instanceof BaseError) {
                return error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }

    }
}
module.exports = RoleRepository;