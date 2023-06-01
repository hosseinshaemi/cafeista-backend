const jwt = require('jsonwebtoken');
const authValidator = require('../models/validators/userAuthValidator');
const { User } = require('../models');
const getRandomNumber = require('../utils/random');
const sendEmail = require('../utils/mailer');
const errorHandler = require('../utils/errorHandler');

const registerHandler = async (req, res) => {
  const result = authValidator.validate(req.body);

  if (result.error) {
    const errArray = [];
    result.error.details.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
  }

  const { email, firstname, lastname } = req.body;

  try {
    const user = await User.create(req.body);
    const verCode = getRandomNumber(4);
    user.verificationCode = verCode;
    await user.save();
    sendEmail(email, `${lastname} ${firstname}`, 'کد تاییدیه', verCode);
    return res
      .status(200)
      .json({ successfull: true, message: 'ثبت نام موفقیت آمیز بود' });
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
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res
      .status(422)
      .json({ successfull: false, message: 'این ایمیل وجود ندارد' });

  if (user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = getRandomNumber(4);
    await user.save();
    return res
      .status(200)
      .json({ successfull: true, message: 'احراز هویت با موفقیت انجام شد' });
  }

  return res
    .status(200)
    .json({ successfull: false, message: 'احراز هویت با شکست مواجه شد' });
};

const resendCodeHandler = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res
      .status(422)
      .json({ successfull: false, message: 'این ایمیل وجود ندارد' });

  const firstname = user.firstname,
    lastname = user.lastname;
  const verCode = getRandomNumber(4);
  user.verificationCode = verCode;
  await user.save();
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

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res
      .status(401)
      .json({ successfull: false, message: 'کاربری با این مشخصات یافت نشد' });
  }

  if (!user.isVerified) {
    return res
      .status(401)
      .json({ successfull: false, message: 'حساب نیازمند تایید است' });
  }
  const payload = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
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
  loginHandler,
};
