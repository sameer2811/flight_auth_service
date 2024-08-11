const {
    createUserSignUpController,
    createUserSignInController
} = require('../../../controller/userController');
const {
    userSignUpValidator
} = require('../../../validators/');

const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup', userSignUpValidator, createUserSignUpController);
userRouter.post('/signin', userSignUpValidator, createUserSignInController);

module.exports = userRouter;