const { Cafe, Table, TableDate, User, Reserve } = require('../models');
const errorHandler = require('../utils/errorHandler');

const reserveTable = async (req, res) => {
  const user = User.findOne({ where: req.body.userId });
  try {
    const newReserve = await Reserve.create({
      date: req.body.date,
      time: req.body.time,
      number: req.body.number,
      phonenumber: req.body.phonenumber,
      hostname: req.body.hostname,
    });
    user.addReserve(newReserve);
  } catch (error) {
    return errorHandler();
  }
};

module.exports = {
  reserveTable,
};
