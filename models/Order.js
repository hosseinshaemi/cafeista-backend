const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('orders', {
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  totalcost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isPayed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paymentCode: {
    type: DataTypes.STRING,
  },
  isAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
