const express = require('express');
const pingRouter = require('./pingRouter');
const userRouter = require('./user');
const v1Router = express.Router();


v1Router.use('/ping', pingRouter);
v1Router.use('/user', userRouter);
module.exports = v1Router;