const { Cafe, User, Comment, Category, Item } = require('../models');

const getBest = async (req, res) => {
  try {
    const cafes = await Cafe.findAll({ include: { model: Comment } });
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

const getSpecificCafe = async (req, res) => {
  let menu = [];
  try {
    const cafe = await Cafe.findByPk(req.body.cafeId);
    const category = await Category.findAll({
      where: { cafeId: req.body.cafeId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    for (let item of category) {
      const itemofCategory = await Item.findAll({
        where: { categoryId: item.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      menu.push({
        name: item.name,
        goods: itemofCategory,
      });
    }
    const comments = await Comment.findAll({
      where: { cafeId: req.body.cafeId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: User, attributes: ['firstname', 'lastname'] },
    });
    console.log(comments);
    let score = 0.0;
    for (let item of comments) {
      score += item.score;
      item.score = score;
    }
    score /= comments.length;

    res.status(200).json({
      Menu: menu,
      Comment: comments,
      score: score,
      clientperHour: cafe.clientperHour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

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
