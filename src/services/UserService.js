const {
    StatusCodes
} = require('http-status-codes');
const {
    RoleRepository
} = require('../repositories');
const {
    AppError
} = require('../utils/errors');
const {
    generateJsonWebToken,
    checkPassword
} = require('../utils/common/auth');

const USER_ROLE_ENUM = require('../utils/common/enums');
const roleRepository = new RoleRepository();
class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async signUpUser(data) {
        try {
            const user = await this.repository.create(data);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "User is not created check again");
            }
            const role = await roleRepository.getRoleByName({
                roleName: USER_ROLE_ENUM.CUSTOMER
            });
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, "No role with the specific roleName is found")
            }
            await user.addRole(role);
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    }

    async signInUser(data) {
        try {
            const user = await this.repository.fetchUserByEmailId(data);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "User is not found with this email id");
            }
            // now check whether the user password is same or not
            const isPasswordMatched = checkPassword(data.password, user.password);
            if (!isPasswordMatched) {
                throw new AppError(StatusCodes.NOT_FOUND, "Password is not correct with this email id");
            }
            // generate the web token and assing it back to the user.
            data.id = user.id;
            const jsonToken = generateJsonWebToken(data);
            return jsonToken;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    }

    async assignRoleToUser(userRoleDetails) {
        try {
            const user = await this.repository.get(userRoleDetails.userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "User is not found with this id");
            }
            const role = await roleRepository.getRoleByName({
                roleName: userRoleDetails.role
            });
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, "No role with the roleName you provided is found");
            }
            await user.addRole(role);
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    }

    async checkIsUserAdmin(id) {
        try {
            const user = await this.repository.get(id);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, "User is not found with this id");
            }
            const role = await roleRepository.getRoleByName({
                roleName: USER_ROLE_ENUM.ADMIN
            });
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, "No role with the roleName you provided is found");
            }
            let hasRole = await user.hasRole(role);
            return hasRole;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
        }
    }
}
module.exports = UserService;