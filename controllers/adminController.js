const { Cafe } = require('../models');

const getCafes = async (req, res) => {
  try {
    const dto = [];
    const cafes = await Cafe.findAll();

    const verified = cafes.filter((item) => item.isVerified);

    verified.forEach((item) => {
      dto.push({
        id: item.id,
        cafename: item.cafename,
        address: item.address,
        isVerifiedByAdmin: item.isVerifiedByAdmin,
      });
    });

    return res.status(200).json({
      success: true,
      message: dto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

const confirmCafe = async (req, res) => {
  try {
    const id = req.body.id;
    const cafe = await Cafe.findOne({ where: { id } });

    if (!cafe) {
      return res.status(422).json({
        success: false,
        message: 'کافه ای با این آیدی یافت نشد',
      });
    }

    cafe.isVerifiedByAdmin = true;
    await cafe.save();

    return res.status(200).json({
      success: true,
      message: 'کافه با موفقیت تایید شد',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'در سرور خطایی رخ داده است',
    });
  }
};

const deleteCafe = async (req, res) => {
  try {
    const id = req.body.id;
    const cafe = await Cafe.findOne({ where: { id } });

    if (!cafe) {
      return res.status(422).json({
        success: false,
        message: 'کافه ای با این آیدی یافت نشد',
      });
    }

    cafe.isVerifiedByAdmin = false;
    await cafe.save();

    return res.status(200).json({
      success: true,
      message: 'کافه با موفقیت عدم تایید شد',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'در سرور خطایی رخ داده است',
    });
  }
};

module.exports = {
  getCafes,
  confirmCafe,
  deleteCafe,
};
