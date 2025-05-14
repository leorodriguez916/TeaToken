const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const authenticateToken = require("../middleware/auth");

console.log("Auth router loaded.");

// Middleware to verify JWT and extract user ID
// export function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401); // No token

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // Invalid token
//     req.user = user; // Payload from token (e.g., { id, username })
//     next();
//   });
// }

router.get("/", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "username", "email", "points", "role"],
  });
  res.json(user);
});

module.exports = router;
