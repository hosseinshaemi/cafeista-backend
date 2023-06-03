const express = require('express');
const mainController = require('../controllers/mainController');
const userMain = require('../controllers/userMainController');
const route = express.Router();

route.get('/getbest', mainController.getBest);

route.get('/getfavorites', mainController.getFavorites);

route.get('/getspecificcafe', mainController.getSpecificCafe);

route.post('/markcafe', mainController.markCafe);

route.post('/getCafe', userMain.showMenu);

module.exports = route;
