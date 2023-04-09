const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('comments', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Comment;
