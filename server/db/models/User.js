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
  passwordConfirm: {
    type: Sequelize.STRING,
    validate: {
      isEqualwithPassword(value) {
        if (!value) throw new Error("Please enter a password.");
        if (value !== this.password)
          throw new Error("Incorrect Password. Please try again.");
      },
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
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://e6.pngbyte.com/pngpicture/76945/png-default-image-png-Default-Profile_thumbnail.png",
  },
  role: {
    type: Sequelize.ENUM("admin", "customer"),
    defaulValue: "customer",
  },
});

//Instance Methods
User.prototype.correctPassword = function (enteredPw) {
  return bcrypt.compare(enteredPw, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//Class Methods
User.authenticate = async function () {
  return await 1;
};

module.exports = User;
