const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  caffeine: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  imageSrc: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "x",
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
