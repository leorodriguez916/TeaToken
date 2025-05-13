const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");

console.log("Login router loaded.");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Username: ", username);

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
