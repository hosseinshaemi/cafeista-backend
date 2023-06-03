const { Cafe, User, Comment, Category, Item, Order } = require('../models');
const getRandomNumber = require('../utils/random');

const setOrder = async (req, res) => {
  const itemsOrders = req.body.items;
  const descp = req.body.descp;
  let tprice = 0;
  for (let item of itemsOrders) {
    const price = await Item.findOne({ where: { id: item.id } });
    tprice += item.count * price;
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
};

module.exports = {
  setOrder,
};
