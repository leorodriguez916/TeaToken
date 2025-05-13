const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");

async function hashPass(password) {
  const result = await bcryptjs.hash(password, 8);
  return result;
}

async function compare(userPassword, hashPassword) {
  const result = await bcryptjs.compare(userPassword, hashPassword);
  return result;
}

console.log("Signup router loaded.");

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
    const nameCheck = await User.findOne({
      where: { username: req.body.name },
    });
    console.log("Name taken: ", nameCheck);
    const emailCheck = await User.findOne({
      where: { email: req.body.email },
    });

    if (nameCheck) {
      return res
        .status(409)
        .send("That username is already taken. Please try again!");
    }
    console.log("Email taken: ", emailCheck);
    if (emailCheck) {
      return res
        .status(409)
        .send("That email is already taken. Please try again!");
    }

    const hashedPassword = await hashPass(req.body.password);

    const token = jwt.sign({ username: req.body.name }, process.env.JWT_SECRET);

    const newUser = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      points: 200,
      role: req.body.role || "customer",
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Signup backend error:", err);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
