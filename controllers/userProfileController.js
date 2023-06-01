const { User } = require('../models');

const getProfile = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (user) {
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
    });
  } else {
    res.status(404).json({
      succes: false,
      msg: 'کاربر پیدا نشد',
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.phonenumber = req.body.phonenumber || user.phonenumber;
    user.email = req.body.email || user.email;
    await user.save();
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'کاربر پیدا نشد',
    });
  }
};

const updatePassword = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  if (req.body.curPass === user.password) {
    user.password = req.body.newPass;
  } else {
    res.status(404).json({
      success: false,
      msg: 'رمز فعلی اشتباه می‌باشد',
    });
  }
  await user.save();
  res.status(200).send('.رمز با موفقیت تغییر یافت');
};

module.exports = {
  getProfile,
  updatePassword,
  updateUserProfile,
};
