const { Model } = require('sequelize');
const { Cafe, User, Comment, Category, Item, Order } = require('../models');

const getHistory = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: email });
    const orders = await Order.findAll({
      include: [
        { model: User, where: { id: user.id } },
        { model: Cafe, attributes: 'cafename' },
      ],
      attributes: ['paymentCode', 'totalCost', 'createdAt'],
    });
    res.status(200).json({
      msg: orders,
    });
  } catch (error) {}
};

module.exports = {
  getHistory,
};
