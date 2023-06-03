const { Cafe, User, Item, Order } = require('../models');
const errorHandler = require('../utils/errorHandler');
const getRandomNumber = require('../utils/random');

const setOrder = async (req, res) => {
  const itemsOrders = req.body.items;
  const descp = req.body.descp;
  let tprice = 0;
  try {
    for (let item of itemsOrders) {
      const it = await Item.findOne({ where: { id: item.id } });
      tprice += item.count * it.price;
    }
    const order = await Order.create({
      description: req.body.descp,
      isPayed: false,
      totalcost: tprice,
      paymentCode: getRandomNumber(5),
    });
    const user = await User.findOne({ where: { email: req.user.email } });
    const cafe = await Cafe.findByPk(req.body.cafeId);
    cafe.addOrder(order);
    user.addOrder(order);
    res.status(200).json({
      successfull: true,
      message: 'موفقیت آمیز بود',
    });
  } catch (error) {
    res.status(500).json({
      successfull: false,
      message: 'خطایی در سرور رخ داده است',
    });
  }
};

module.exports = {
  setOrder,
};
