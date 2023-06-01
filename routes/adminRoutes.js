const express = require('express');
const adminController = require('../controllers/adminController');
const route = express.Router();

route.post('/getcafes', adminController.getCafes);

route.post('/confirmcafe', adminController.confirmCafe);

route.put('/deletecafe', adminController.deleteCafe);

module.exports = route;