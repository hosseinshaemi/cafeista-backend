const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const authValidator = require('../models/validators/userAuthValidator');
const { User } = require('../models');
const getRandumNumber = require('../utils/random');
const sendEmail = require('../utils/mailer');

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
    const verCode = getRandumNumber(4);
    user.verificationCode = verCode;
    await user.save();
    sendEmail(email, `${lastname} ${firstname}`, 'کد تاییدیه', verCode);
    return res.status(200).json({ successfull: true });
  } catch (error) {
    const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
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
    user.verificationCode = getRandumNumber(4);
    await user.save();
    return res
      .status(200)
      .json({ successfull: true, message: 'احراز هویت با موفقیت انجام شد' });
  }

  return res
    .status(200)
    .json({ successfull: false, message: 'احراز هویت با شکست مواجه شد' });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res
      .status(422)
      .json({ successfull: false, message: 'کاربری با این مشخصات یافت نشد' });
  }

  const payload = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  });
  res.status(200).json({ successfull: true, message: 'ورود موفقیت آمیز بود' });
};

module.exports = { registerHandler, verifyCodeHandler, loginHandler };
