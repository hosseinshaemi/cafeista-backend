const {
  Cafe,
  Item,
  User,
  Reserve,
  Order,
  OrderItem,
  Table,
  TableDate,
} = require('../models');
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

const inQueueResv = async (req, res) => {
  try {
    const resv = await Reserve.findAll({
      where: { cafeId: req.body.cafeId, isAccepted: false },
      include: {
        model: User,
        attributes: ['firstname', 'lastname', 'phonenumber'],
      },
      attributes: ['start', 'end', 'number'],
    });
  } catch (error) {}
};

const inQueueOrds = async (req, res) => {
  try {
    const ords = await Order.findAll({
      where: { cafeId: req.body.cafeId, isAccepted: false },
      include: [
        { model: User, attributes: ['firstname', 'lastname'] },
        {
          model: OrderItem,
          include: [{ model: Item, attributes: ['name'] }],
          attributes: ['count'],
        },
      ],
      attributes: 'description',
    });
  } catch (error) {}
};

const acceptedords = async (req, res) => {
  try {
    const accepteds = await Order.findAll({
      where: { cafeId: req.body.cafeId, isAccepted: true },
      include: [{ model: User, attributes: ['firstname', 'lastname'] }],
    });
  } catch (error) {}
};

const showTable = async (req, res) => {
  try {
    const cafe = await Cafe.findByPk(req.body.cafeId);
    const user = await User.findByPk(req.body.userId);
    const tables = await Table.findAll({
      include: { model: Cafe, where: { id: req.body.cafeId } },
    });
  } catch (error) {}
};

const assignTable = async (req, res) => {
  try {
    const table = await Table.findOne({
      where: { id: req.body.tableId },
    });
    const tableDate = await TableDate.create({
      date: req.body.date,
    });
    table.addTableDate(tableDate);
  } catch (error) {}
};

module.exports = {
  reserveTable,
  inQueueResv,
  acceptedords,
  inQueueOrds,
  assignTable,
};
