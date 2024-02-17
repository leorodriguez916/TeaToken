const router = require("express").Router();
const {
  models: { User },
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
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const check = await User.findOne({ name: req.body.name });

    if (check) {
      res.send("User already exists.");
    } else {
      const token = jwt.sign(
        { name: req.body.name },
        "uirfnicsendfujsehbfksnncfbhjdcskjfhudjksfjduhinfjksdmjueihfsjkciuhfjksu"
      );

      const data = {
        name: req.body.name,
        password: hashPass(req.body.password),
        token: token,
      };

      const addUser = await User.create(data);
    }
  } catch (err) {
    res.send("Incorrect details entered.");
  }
});
