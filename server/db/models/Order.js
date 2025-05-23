const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isInCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  subtotal: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.01,
    },
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending",
  },
});
module.exports = Order;
