class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async signUpUser(data) {
        try {
            const response = await this.repository.create(data);
            return response;
        } catch (error) {
            return error;
        }
    }

    async signInUser(data) {
        try {
            const response = await this.repository.create(data);
            return response;
        } catch (error) {
            return error;
        }
    }
}

module.exports = UserService;