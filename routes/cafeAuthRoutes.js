const express = require('express');
const cafeAuthController = require('../controllers/cafeAuthController');
const route = express.Router();

route.post('/register', cafeAuthController.registerHandler);

route.post('/register/verifyCode', cafeAuthController.verifyCodeHandler);

route.post('/login', cafeAuthController.loginHandler);

module.exports = route;
