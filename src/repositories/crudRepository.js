const {
    AppError
} = require("../utils/errors");
const {
    StatusCodes
} = require('http-status-codes');

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_IMPLEMENTED, error);
        }
    }

    async get(id) {
        try {
            const response = await this.model.findByPk({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_FOUND, error);
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_FOUND, error);
        }
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_FOUND, error);
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            throw new AppError(StatusCodes.NOT_FOUND, error);
        }
    }
}
module.exports = CrudRepository;