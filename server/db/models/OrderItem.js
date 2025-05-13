const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("product_in_cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  productPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  totalPrice: productPrice ** quantity,
});

module.exports = OrderItem;
