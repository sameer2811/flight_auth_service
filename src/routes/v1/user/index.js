const createUserSignUpController = require('../../../controller/userController');
const { userSignUpValidator } = require('../../../validators/');

const express = require('express');
const userRouter = express.Router();


userRouter.post('/signup', userSignUpValidator, createUserSignUpController);

module.exports = userRouter;