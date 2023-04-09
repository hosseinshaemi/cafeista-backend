const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const OrderItem = sequelize.define('OrderItems', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
