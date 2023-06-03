const { Cafe, User, Comment, Category, Item } = require('../models');
const showMenu = async (req, res) => {
  let menu = [];
  const cafeId = req.body.cafeId;
  try {
    const cafname = await Cafe.findByPk(cafeId);
    const user = await User.findOne({
      where: { email: req.user.email },
      include: { model: Cafe, through: 'favorites', where: { id: cafeId } },
    });
    let isMarked = false;
    if (user) isMarked = true;
    const category = await Category.findAll({ where: { cafeId: cafeId } });

    for (let item of category) {
      const catId = item.id;
      const itemofCategory = await Item.findAll({
        where: { categoryId: catId },
        attributes: ['name', 'price', 'discount', 'picture'],
      });
      menu.push({
        name: item.name,
        goods: itemofCategory,
      });
    }
    const comments = await Comment.findAll({
      where: { cafeId: cafeId },
      include: { model: User, attributes: ['firstname', 'lastname'] },
      attributes: ['text', 'score'],
    });

    let score = 0.0;
    for (let item of comments) score += item.score;
    score /= comments.length;

    score = score.toFixed(2);

    res.status(200).json({
      name: cafname.cafename,
      score: score,
      address: cafname.address.split(' ')[0],
      success: true,
      message: menu,
      comments: comments,
      isMarked: isMarked,
      success: true,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = {
  showMenu,
};
