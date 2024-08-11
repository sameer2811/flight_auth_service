const serverConfig = require('../config/serverConfig');
class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async signUpUser(data) {
        try {
            const response = await this.repository.create(data);
            return response;
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