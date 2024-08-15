const serverConfig = require('../config/serverConfig');
const {
    RoleRepository
} = require('../repositories');
const USER_ROLE_ENUM = require('../utils/common/enums');
const roleRepository = new RoleRepository();
class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async signUpUser(data) {
        try {
            const user = await this.repository.create(data);
            const role = await roleRepository.getRoleByName({
                roleName: USER_ROLE_ENUM.CUSTOMER
            });
            await user.addRole(role);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signInUser(data) {
        try {
            const response = await this.repository.signInUser(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;