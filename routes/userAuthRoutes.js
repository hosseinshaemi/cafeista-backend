const express = require('express');
const userAuthController = require('../controllers/userAuthController');
const route = express.Router();

route.post('/register', userAuthController.registerHandler);

route.post('/register/verifyCode', userAuthController.verifyCodeHandler);

route.put('/register/verifyCode', userAuthController.resendCodeHandler);

route.post('/login', userAuthController.loginHandler);

module.exports = route;
