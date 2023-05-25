const express = require('express');
const upload = require('../utils/multer');
const menu = require('../controllers/menuItems');
const { Cafe } = require('../models/index');
const route = express.Router();


route.post('/addItem', upload.single('file'), menu.addItem);

module.exports = route;
