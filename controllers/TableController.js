const { Cafe, Category, Item, User, Reserve } = require('../models');
const errorHandler = require('../utils/errorHandler');

const reserveTable = async (req, res) => {
  const email = req.body.email;
  try {
    const resv = {
      data: req.body,
      time: req.body,
      number: req.number,
      hostname: req.body.hostname,
    };
    const user = User.findOne({ where: req.body.email });
    const cafe = Cafe.findOne({ where: req.body.cafeId });

    await Reserve.create(resv);
    user.addReserve(resv);
    cafe.addReserve(resv);
  } catch (error) {
    return errorHandler;
  }
};
