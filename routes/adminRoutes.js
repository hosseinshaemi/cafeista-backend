const express = require('express');
const adminController = require('../controllers/adminController');
const route = express.Router();

route.get('/getcafes', adminController.getCafes);

route.put('/confirmcafe', adminController.confirmCafe);

route.put('/deletecafe', adminController.deleteCafe);

module.exports = route;