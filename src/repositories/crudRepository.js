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
        const response = await this.model.create(data);
        if (!response) {
            throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not Able to create the resource !");
        }
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk({
            where: {
                id: id
            }
        });
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not Able to find the resource you are looking For !");
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not Able to find the resources you are looking For !");
        }
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });

        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not Able to find the resource");
        }
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        });
        if (!response || parseInt(response[0]) === 0) {
            throw new AppError(StatusCodes.NOT_FOUND, "Not Able to find the resource you want to update");
        }
        return response;
    }
}
module.exports = CrudRepository;