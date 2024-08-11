const express = require('express');

const {
    PingController
} = require('../../controller/index');

const {
    checkIsUserAuthenticated
} = require('../../validators/userAuthentication');

const pingRouter = express.Router();

pingRouter.get('/', checkIsUserAuthenticated, PingController);

module.exports = pingRouter;