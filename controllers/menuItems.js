const { Cafe, Category, Item } = require('../models');

const addItem = async (req, res) => {
  const cafeId = req.body.cafeId;
  const categoryId = req.body.categoryId;
  const property = JSON.parse(req.body.properties);
  const itemobj = {
    name: property.name,
    price: property.price,
    picture: req.file.buffer,
  };
  console.log(itemobj);
  try {
    const newItem = await Item.create(itemobj);
    await newItem.save();
    res.status(200).json({
      successfull: true,
      message: 'آیتم با موفقیت اضافه شد',
    });
  } catch (error) {
    const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
  }
};

const createCategory = async (req, res) => {
  const catobj = {
    ...req.body,
    name: '',
    cafeId: '',
  };
  try {
    const newCategory = await Category.create(catobj);
    await Category.save();
  } catch (error) {
    const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    });
  }
};

const showMenu = async (req, res) => {
  let menu = [];
  let items = [];
  const cafeId = req.body.cafe_id;
  const category = await Category.findAll({ where: { cafeId } });
  category.forEach(async (index) => {
    const indexId = index.id;
    const itemofCategory = await Item.findAll({ where: { indexId } });
    itemofCategory.forEach(async (eachitem) => {
      items.push(eachitem);
    });
    menu.push({
      name: index.name,
      goods: items,
    });
  });
};

module.exports = {
  addItem,
  createCategory,
  showMenu,
};
