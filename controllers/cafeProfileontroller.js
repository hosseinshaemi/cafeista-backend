const { Cafe } = require('../models');

const getProfile = async (req, res) => {
  const { email } = req.user;
  try {
    const cafe = await Cafe.findOne({
      where: { email },
      attributes: [
        'email',
        'phoneNumber',
        'address',
        'cafephonenumber',
        'accountNumber',
      ],
    });
    res.status(200).json({
      success: true,
      message: cafe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

const updateCafeProfile = async (req, res) => {
  const { email } = req.user;
  const cafe = await Cafe.findOne({ where: { email } });
  if (cafe) {
    cafe.email = req.body.email || cafe.email;
    cafe.phonenumber = req.body.phonenumber || cafe.phonenumber;
    cafe.address = req.body.address || cafe.address;
    cafe.cafephonenumber = req.body.cafephonenumber || cafe.cafephonenumber;
    cafe.accountNumber = req.body.accountNumber || cafe.accountNumber;
    await cafe.save();
    res.json({
      email: cafe.email,
      phonenumber: cafe.phonenumber,
      address: cafe.address,
      phonenumber: cafe.accountNumber,
      accountNumber: cafe.accountNumber,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'کاربر پیدا نشد',
    });
  }
};

const updateGallery = async (req, res) => {
  try {
    const cafe = await Cafe.findByPk(req.body.cafeId);
    for (let file in req.files)
      if (!cafe.pictures.include(file.originalname))
        cafe.pictures.push(file.originalname);
  } catch (error) {}
};

const deleteAccount = async (req, res) => {
  try {
    const cafe = await Cafe.findByPk(req.body.cafeId);
    await cafe.destroy();
  } catch (error) {}
};

const getWallet = async (req, res) => {};

module.exports = {
  getProfile,
  updateCafeProfile,
  updateGallery,
  deleteAccount,
};
