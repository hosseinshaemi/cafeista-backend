const express = require('express');
const userAuthController = require('../controllers/userProfileController');
const basket = require('../controllers/Basket');
const route = express.Router();

route.get('/profile', userAuthController.getProfile);

route.put('/profile', userAuthController.updateUserProfile);

route.post('/profile', userAuthController.updateUserProfile);

route.post('/profile/updatePass', userAuthController.updatePassword);

route.put('/profile/updatePass', userAuthController.updatePassword);

route.post('/basket',basket.setOrder);

module.exports = route;
