const express = require('express');
const userAuthController = require('../controllers/userProfileController');
const route = express.Router();

route.get('/profile', userAuthController.getProfile);

route.put('/profile', userAuthController.updateUserProfile);

route.post('/profile', userAuthController.updateUserProfile);

route.post('/profile/updatePass', userAuthController.updatePassword);

route.put('/profile/updatePass', userAuthController.updatePassword);

module.exports = route;
