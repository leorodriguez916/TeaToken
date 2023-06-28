const Sequelize = require("sequelize");
const db = require("../db");

const ProductInCart = db.define("product_in_cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  numItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  totalPriceForProduct: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = ProductInCart;
