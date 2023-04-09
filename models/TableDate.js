const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const TableDate = sequelize.define('dates', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  times: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('times').split(';');
    },
    set(value) {
      this.setDataValue('times', value.join(';'));
    },
  },
});

module.exports = TableDate;
