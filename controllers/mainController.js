const { Cafe, User, Comment } = require('../models');

const getBest = async (req, res) => {
  const cafes = await Cafe.findAll({ include: { model: Comment } });
  try {
    const dto = cafes.map((item) => ({
      name: item.cafename,
      pictures: ['test1.jpg', 'test2.jpg'],
      comments: item.comments,
    }));
    for (let item of dto) {
      let score = 0.0;
      for (let com of item.comments) score += com.score;
      score /= item.comments.length;
      item.score = score;
    }

    for (let item of dto) delete item.comments;

    dto.sort((a, b) => b.score - a.score);

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

const getFavorites = async (req, res) => {
  try {
    const email = req.user.email;
    const cafes = await Cafe.findAll({
      include: [
        { model: User, where: { email }, through: 'favorites' },
        { model: Comment },
      ],
    });
    const dto = cafes.map((item) => ({
      name: item.cafename,
      pictures: ['test1.jpg', 'test2.jpg'],
      comments: item.comments,
    }));
    for (let item of dto) {
      let score = 0.0;
      for (let com of item.comments) score += com.score;
      score /= item.comments.length;
      item.score = score;
    }

    for (let item of dto) delete item.comments;
    dto.sort((a, b) => b.score - a.score);
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

const getSpecificCafe = async (req, res) => {};

const markCafe = async (req, res) => {
  try {
    const email = req.user.email,
      cafeId = req.body.cafeId;
    const user = await User.findOne({ where: { email } });
    const cafe = await Cafe.findOne({ where: { id: cafeId } });
    cafe.addUser(user);

    return res.status(200).json({
      success: true,
      message: 'با موفقیت به علاقه مندی ها اضافه شد',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

module.exports = {
  getBest,
  getFavorites,
  getSpecificCafe,
  markCafe,
};
