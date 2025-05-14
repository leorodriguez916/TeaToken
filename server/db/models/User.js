const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imageSrc: {
    type: Sequelize.STRING,
    defaultValue: "player.png",
  },
  role: {
    type: Sequelize.ENUM("admin", "customer"),
    defaulValue: "customer",
  },
});

//Old Instance Methods used to validate password; now it is part of the Login and Signup features
// User.prototype.correctPassword = function (enteredPw) {
//   return bcrypt.compare(enteredPw, this.password);
// };

// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, process.env.JWT);
// };

// // //Class Methods
// User.authenticate = async function () {
//   return await 1;
// };

//Old attribute used to validate password.
// passwordConfirm: {
//   type: Sequelize.STRING,
//   validate: {
//     isEqualwithPassword(value) {
//       if (!value) throw new Error("Please enter a password.");
//       if (value !== this.password)
//         throw new Error("Incorrect Password. Please try again.");
//     },
//   },
// },

module.exports = User;
