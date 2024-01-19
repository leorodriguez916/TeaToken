const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");

module.exports = router;

async function hashPass(password) {
  const result = await brycptjs.hash(password, 8);
  return result;
}

async function compare(userPassword, hashPassword) {
  const result = await brycptjs.compare(userPassword, hashPassword);
  return result;
}

router.use(cookieParser);

//GET @ /api/signup
//Get the sign up page.
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "imageSrc", "description"],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const check = await Product.findOne(
      { name: req.body.name },
      "uirfnicsendfujsehbfksnncfbhjdcskjfhudjksfjduhinfjksdmjueihfsjkciuhfjksu"
    );
    if (check) {
      res.send("User already exists.");
    } else {
      const token = jwt.sign({ name: req.body.name });

      const data = {
        name: req.body.name,
        password: req.body.password,
        token: token,
      };
    }
  } catch (err) {
    res.send("Incorrect details entered.");
  }
});
