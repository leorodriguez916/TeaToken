//This is the access point for all things database related.

const db = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const ProductInCart = require("./models/ProductInCart");

//Associations
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: ProductInCart });
Product.belongsToMany(Order, { through: ProductInCart });

Product.hasMany(ProductInCart);
ProductInCart.belongsTo(Product);

Order.hasMany(ProductInCart);
ProductInCart.belongsTo(Order);

User.hasMany(ProductInCart);
ProductInCart.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    ProductInCart,
  },
};
