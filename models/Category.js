const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Category;
