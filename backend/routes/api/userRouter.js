const express = require('express');
const userRouter = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

userRouter.route('/')
    .get(verifyRoles(ROLES_LIST.ADMIN), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.ADMIN), usersController.deleteUser);

userRouter.route('/:id')
    .get(verifyRoles(ROLES_LIST.ADMIN), usersController.getUser);

module.exports = userRouter;