const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/signup", require("./signup"));

router.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});
