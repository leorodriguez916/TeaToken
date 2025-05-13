const router = require("express").Router();
module.exports = router;
console.log("Routes/index.js loaded.");

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/me", require("./me"));

router.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});
