const express = require('express');
const refreshRouter = express.Router();
const refreshController = require('../controllers/refreshTokenController');

refreshRouter.get('/', refreshController.handleRefreshToken);

module.exports = refreshRouter;