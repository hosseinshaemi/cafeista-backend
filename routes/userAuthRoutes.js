const express = require('express');
const userAuthController = require('../controllers/userAuthController');
const route = express.Router();

route.post('/register', userAuthController.registerHandler);

route.post('/register/verifyCode', userAuthController.verifyCodeHandler);

route.post('/login', userAuthController.loginHandler);

module.exports = route;
