const express = require('express');
const upload = require('../utils/multer');
const menu = require('../controllers/menuItemsController');
const historyOrder = require('../controllers/historyOrderController');
const route = express.Router();

route.post('/addCategory', menu.createCategory);
route.post('/addItem', upload.single('file'), menu.addItem);
route.get('/showMenu', menu.showMenu);
route.get('/historyOrder', historyOrder.getCafeHistory);

module.exports = route;
