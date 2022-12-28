const express = require('express');
const userRouter = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

userRouter.route('/') // /api/users
    .get(verifyRoles(ROLES_LIST.ADMIN), usersController.getAllUsers) // Get all users
    .delete(verifyRoles(ROLES_LIST.ADMIN), usersController.deleteUser); // Delete user

userRouter.route('/:id') // /api/users/:id
    .get(verifyRoles(ROLES_LIST.ADMIN), usersController.getUser); // Get user

module.exports = userRouter;