const { Cafe, User, Order, OrderItem, Item } = require('../models');

const getUserHistory = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await User.findOne({ where: { email } });
    const orders = await Order.findAll({
      include: [
        { model: User, where: { id: user.id }, attributes: [] },
        { model: Cafe, attributes: ['cafename'] },
      ],
      attributes: ['id', 'paymentCode', 'totalcost', 'createdAt'],
    });
    return res.status(200).json({
      success: true,
      message: orders,
    });
  } catch (error) {
    res.status(500).json({
      susccess: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

const getCafeHistory = async (req, res) => {
  try {
    const ords = await Order.findAll({
      where: { cafeId: req.body.cafeId },
      include: {
        model: OrderItem,
        include: [{ model: Item, attributes: ['name', 'price'] }],
        attributes: ['count'],
      },
      attributes: 'description',
    });
  } catch (error) {}
};

module.exports = {
  getUserHistory,
  getCafeHistory,
};
