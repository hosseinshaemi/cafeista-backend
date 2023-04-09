const authValidator = require('../models/validators/cafeAuthValidator');
const { Cafe } = require('../models');

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

  const { email, firstname, lastname, cafename } = req.body;

  try {
    const cafe = await Cafe.create(req.body);
    const verCode = getRandumNumber(4);
    cafe.verificationCode = verCode;
    await cafe.save();
    sendEmail(
      email,
      `${cafename} صاحب کافه ${lastname} ${firstname}`,
      'کد تاییدیه',
      verCode
    );
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
  const cafe = await Cafe.findOne({ where: { email } });
  if (!cafe)
    return res
      .status(422)
      .json({ successfull: false, message: 'این ایمیل وجود ندارد' });

  if (cafe.verificationCode === code) {
    cafe.isVerified = true;
    cafe.verificationCode = getRandumNumber(4);
    await cafe.save();
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
  const cafe = await Cafe.findOne({ where: { email, password } });
  if (!cafe) {
    return res
      .status(422)
      .json({ successfull: false, message: 'کاربری با این مشخصات یافت نشد' });
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

module.exports = { registerHandler, verifyCodeHandler, loginHandler };
