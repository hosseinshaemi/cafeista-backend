const User = require('./User'),
  Cafe = require('./Cafe'),
  Comment = require('./Comment'),
  Order = require('./Order'),
  Item = require('./Item'),
  OrderItem = require('./OrderItem'),
  Category = require('./Category'),
  Table = require('./Table'),
  TableDate = require('./TableDate'),
  Reserve = require('./Reserve');

User.belongsToMany(Cafe, { through: 'favorites', onDelete: 'CASCADE' });
Cafe.belongsToMany(User, { through: 'favorites', onDelete: 'CASCADE' });

User.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Order, { onDelete: 'CASCADE' });
Order.belongsTo(User);
User.hasMany(Reserve, { onDelete: 'CASCADE' });
Reserve.belongsTo(User);
Cafe.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Cafe);
Cafe.hasMany(Order);
Order.belongsTo(Cafe);
Cafe.hasMany(Category, { onDelete: 'CASCADE' });
Category.belongsTo(Cafe);
Cafe.hasMany(Table, { onDelete: 'CASCADE' });
Table.belongsTo(Cafe);
Cafe.hasMany(Reserve, { onDelete: 'CASCADE' });
Reserve.belongsTo(Cafe);
Category.hasMany(Item, { onDelete: 'CASCADE' });
Item.belongsTo(Category);
Table.hasMany(TableDate, { onDelete: 'CASCADE' });
TableDate.belongsTo(Table);
Table.hasMany(Reserve, { onDelete: 'CASCADE' });
Reserve.belongsTo(Table);
Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });

module.exports = {
  User,
  Cafe,
  Comment,
  Order,
  Item,
  OrderItem,
  Category,
  Table,
  TableDate,
  Reserve,
};
