const { Cafe, User, Order } = require('../models');

const getHistory = async (req, res) => {
  const email = req.user.email;
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
      success: true,
      message: orders,
    });
  } catch (error) {}
};

module.exports = {
  getHistory,
};
