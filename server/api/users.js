const router = require("express").Router();
const {
  models: { User, Product, Order },
} = require("../db");
module.exports = router;

//GET @ /api/users
//Access all users as an admin
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "imageSrc", "role"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET @ /api/users/:userid
//Access a specific user.
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email", "imageSrc", "role"],
      include: { model: Order, include: Product },
    });
    if (!user) {
      res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//DELETE @ /api/users/:userId
//Delete a user as an admin.
router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({ status: "Delete successful." });
  } catch (err) {
    next(err);
  }
});
