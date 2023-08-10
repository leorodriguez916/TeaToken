const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//GET @ /api/products
//Get all products from database and display on Shop page.
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

//GET @ /api/products/:productid
//Get a specific product.
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).send("Product does not exist.");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//POST @ /api/products
//Create a new product as an admin.
router.post("/", async (req, res, next) => {
  try {
    const addProduct = await Product.create(req.body);
    res.json(addProduct);
  } catch (err) {
    next(err);
  }
});

//PUT @ /api/products/:productid
//Update a product as an admin.
router.put("/:id", async (req, res, next) => {
  try {
    const [, [editProduct]] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(editProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE @ /api/products/:productid
//Delete a product as an admin.
router.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({ status: "Delete successful." });
  } catch (err) {
    next(err);
  }
});
