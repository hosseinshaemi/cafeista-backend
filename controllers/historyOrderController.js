const { Cafe, User, Comment, Category, Item,Order } = require('../models');

const getHistory = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: email });
    const ordres = await Order.findAll({where: email},)
  } catch (error) {}
};
