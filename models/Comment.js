const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('comments', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
});


module.exports = Comment;
