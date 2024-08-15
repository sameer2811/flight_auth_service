const {
    createUserSignUpController,
    createUserSignInController,
    assignUserRoleController
} = require('../../../controller/userController');

const {
    userSignUpValidator,
    userRoleValidator,
    checkIsUserAuthenticated,
    checkIsUserAdmin
} = require('../../../validators/');


const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup', userSignUpValidator, createUserSignUpController);
userRouter.post('/signin', userSignUpValidator, createUserSignInController);
userRouter.post('/role', userRoleValidator, checkIsUserAuthenticated, checkIsUserAdmin, assignUserRoleController)

module.exports = userRouter;