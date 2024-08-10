const express = require('express');
const { PingController } = require('../../controller/index');

const pingRouter = express.Router();

pingRouter.get('/', PingController);

module.exports = pingRouter;