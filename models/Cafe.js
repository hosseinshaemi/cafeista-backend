const sequelize = require('../configs/database');
const { DataTypes } = require('sequelize');

const Cafe = sequelize.define('cafes', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'این ایمیل قبلا ثبت نام شده است',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'این شماره موبایل قبلا ثبت نام شده است',
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
  },
  cafename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cafephonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'این شماره ثابت قبلا ثبت نام شده است',
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'این موقعیت مکانی برای کافه ای دیگر است',
    },
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'این شماره حساب برای کافه دیگری ثبت شده است',
    },
  },
  isVerifiedByAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  clientperHour: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = Cafe;
