//This is the access point for all things database related.

const db = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const OrderItem = require("./models/OrderItem");

//Associations
User.hasMany(Order); //These kinds of associations give a foreign key to Order.
Order.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

OrderItem.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
