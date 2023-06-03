const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Reserve = sequelize.define('reserves', {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

module.exports = Reserve;
