const express = require('express');
const cafeAuthController = require('../controllers/cafeAuthController');
const { Cafe } = require('../models');
const route = express.Router();

route.post('/register', cafeAuthController.registerHandler);

route.post('/register/verifyCode', cafeAuthController.verifyCodeHandler);

route.put('/register/verifyCode', cafeAuthController.resendCodeHandler);

route.post('/register/cafeinfo', cafeAuthController.cafeInfoHandler);

route.post('/login', cafeAuthController.loginHandler);

module.exports = route;
