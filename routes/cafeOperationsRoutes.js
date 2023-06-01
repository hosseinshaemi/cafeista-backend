const express = require('express');
const upload = require('../utils/multer');
const menu = require('../controllers/menuItemsController');
const route = express.Router();

route.post('/addCategory', menu.createCategory);
route.post('/addItem', upload.single('file'), menu.addItem);
route.post('/showMenu', menu.showMenu);

module.exports = route;
