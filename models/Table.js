const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Table = sequelize.define('tables', {
  tablenumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Table;
