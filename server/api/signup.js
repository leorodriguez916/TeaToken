const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");

console.log("Signup router loaded.");

async function hashPass(password) {
  const result = await bcryptjs.hash(password, 8);
  return result;
}

async function compare(userPassword, hashPassword) {
  const result = await bcryptjs.compare(userPassword, hashPassword);
  return result;
}

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

//Test if we're in
router.get("/ping", (req, res) => {
  res.send("pong");
});

//CREATE @ /api/signup
//Create a new user.
router.post("/", async (req, res, next) => {
  console.log("Creating a user.");
  try {
    const check = await User.findOne({ where: { username: req.body.name } });

    if (check) {
      return res.status(409).send("User already exists.");
    }

    const hashedPassword = await hashPass(req.body.password);

    const token = jwt.sign({ username: req.body.name }, process.env.JWT_SECRET);

    const newUser = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      token: token,
      role: req.body.role || "customer",
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Signup backend error:", err);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
