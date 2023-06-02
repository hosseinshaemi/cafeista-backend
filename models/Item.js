const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('items', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discount: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

module.exports = Item;
