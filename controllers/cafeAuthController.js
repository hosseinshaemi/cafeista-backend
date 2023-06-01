const jwt = require('jsonwebtoken');
const {
  cafeSchema,
  cafeInfoSchema,
} = require('../models/validators/cafeAuthValidator');
const { Cafe, Category, Item } = require('../models');
const getRandomNumber = require('../utils/random');
const sendEmail = require('../utils/mailer');
const errorHandler = require('../utils/errorHandler');

const registerHandler = async (req, res) => {
  const result = cafeSchema.validate(req.body);
  if (result.error) {
    const errArray = [];
    result.error.details.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
  }

  const cafeObj = {
    ...req.body,
    cafename: '',
    cafephonenumber: '',
    address: '',
    location: '',
    accountNumber: Number.toString(getRandomNumber(10)),
  };

  try {
    const cafe = await Cafe.create(cafeObj);
    const verCode = getRandomNumber(4);
    cafe.verificationCode = verCode;
    await cafe.save();
    sendEmail(
      req.body.email,
      `${req.body.lastname} ${req.body.firstname} کد تاییدیه برای`,
      'کد تاییدیه',
      verCode
    );
    return res
      .status(200)
      .json({ successfull: true, message: 'کد تایید برای شما ارسال شد' });
  } catch (error) {
    /* const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    }); */
    return errorHandler(res, error);
  }
};

const verifyCodeHandler = async (req, res) => {
  const { email, code } = req.body;
  const cafe = await Cafe.findOne({ where: { email } });
  if (!cafe)
    return res
      .status(422)
      .json({ successfull: false, message: 'این ایمیل وجود ندارد' });

  if (cafe.verificationCode === code) {
    cafe.isVerified = true;
    await cafe.save();
    return res
      .status(200)
      .json({ successfull: true, message: 'احراز هویت با موفقیت انجام شد' });
  }

  return res
    .status(200)
    .json({ successfull: false, message: 'احراز هویت با شکست مواجه شد' });
};

const resendCodeHandler = async (req, res) => {
  console.log('Request PUT');
  const { email } = req.body;
  const cafe = await Cafe.findOne({ where: { email } });
  if (!cafe)
    return res
      .status(422)
      .json({ successfull: false, message: 'این ایمیل وجود ندارد' });

  const firstname = cafe.firstname,
    lastname = cafe.lastname;
  const verCode = getRandomNumber(4);
  cafe.verificationCode = verCode;
  await cafe.save();
  sendEmail(
    email,
    `${lastname} ${firstname} کد مجدد برای`,
    'کد تاییدیه',
    verCode
  );
  return res
    .status(200)
    .json({ successfull: true, message: 'کد تایید مجدد برای شما ارسال گردید' });
};

const cafeInfoHandler = async (req, res) => {
  req.body.location = '10.00 10.00';
  const result = cafeInfoSchema.validate(req.body);
  if (result.error) {
    const errArray = [];
    result.error.details.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
  }

  const cafe = await Cafe.findOne({
    where: { email: req.body.email, verificationCode: req.body.code },
  });

  if (!cafe)
    return res
      .status(422)
      .json({ successfull: false, message: 'کاربر یافت نشد' });

  if (!cafe.isVerified)
    return res
      .status(401)
      .json({ successfull: false, message: 'حساب شما تایید نشده است' });

  cafe.cafename = req.body.cafename;
  cafe.cafephonenumber = req.body.cafephonenumber;
  cafe.address = req.body.address;
  cafe.location = req.body.location;
  cafe.accountNumber = req.body.accountNumber;
  cafe.verificationCode = getRandomNumber(4);
  try {
    await cafe.save();
  } catch (error) {
    /* const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    }); */
    return errorHandler(res, error);
  }

  return res
    .status(200)
    .json({ successfull: true, messgae: 'ثبت نام موفقیت آمیز بود' });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const cafe = await Cafe.findOne({ where: { email, password } });
  if (!cafe) {
    return res
      .status(422)
      .json({ successfull: false, message: 'کاربری با این مشخصات یافت نشد' });
  }
  if (!cafe.isVerified) {
    return res
      .status(401)
      .json({ successfull: false, message: 'حساب نیازمند تایید است' });
  }
  const payload = {
    email: cafe.email,
    cafename: cafe.cafename,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  });
  res.status(200).json({ successfull: true, message: 'ورود موفقیت آمیز بود' });
};

module.exports = {
  registerHandler,
  verifyCodeHandler,
  resendCodeHandler,
  cafeInfoHandler,
  loginHandler,
};
