const { Cafe, Category, Item, User } = require('../models');
const errorHandler = require('../utils/errorHandler');

const addItem = async (req, res) => {
  const cafeId = req.body.cafeId;
  const categoryId = req.body.categoryId;
  const property = JSON.parse(req.body.properties);
  const itemobj = {
    name: property.name,
    price: property.price,
    picture: req.file.originalname,
  };
  console.log(itemobj);
  try {
    const prevItem = await Item.findOne({ where: { name: property.name } });

    if (prevItem) {
      return res.status(422).json({
        success: false,
        message: 'این مورد از قبل اضافه شده است',
      });
    }

    const newItem = await Item.create(itemobj);
    await newItem.save();
    res.status(200).json({
      successfull: true,
      message: 'آیتم با موفقیت اضافه شد',
    });
  } catch (error) {
    /* const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    }); */
    return errorHandler(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    const caf = await Cafe.findOne({ where: { id: req.body.cafeId } });

    const prevCat = await Category.findOne({
      where: { name: req.body.name },
      include: { model: Cafe, where: { id: caf.id } },
    });

    if (prevCat) {
      return res.status(422).json({
        success: false,
        message: 'این دسته قبلا اضافه شده است',
      });
    }

    const cat = await Category.create({
      name: req.body.name,
    });
    caf.addCategory(cat);

    res.status(200).json({
      successfull: true,
      message: 'طبقه بندی اضافه شد',
    });
  } catch (error) {
    /* const errArray = [];
    error.errors.forEach((e) => errArray.push(e.message));
    return res.status(422).json({
      successfull: false,
      message: errArray,
    }); */
    return errorHandler(res, error);
  }
};

const showMenu = async (req, res) => {
  let menu = [];
  const cafeId = req.body.cafe_id;
  try {
    const category = await Category.findAll({ where: { cafeId } });
    category.forEach(async (index) => {
      const indexId = index.id;
      const itemofCategory = await Item.findAll({ where: { indexId } });
      menu.push({
        name: index.name,
        goods: itemofCategory,
      });
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = {
  addItem,
  createCategory,
  showMenu,
};
