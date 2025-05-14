const router = require("express").Router();
const {
  models: { Order, OrderItem, Product },
} = require("../db");
module.exports = router;
const authenticateToken = require("../middleware/auth");

//CREATE @ /api/
//Adds a product to a user's cart.
//Req should have an object called user.
router.post("/", async (req, res, next) => {
  try {
    const { user } = req;
    const product = await Product.findByPk(req.body.prodId);
    if (!product) throw new Error("Product not found.");
    const [order] = Order.findOrCreate({
      where: { userId: user.userId, isCart: true },
      include: { model: Product },
      defaults: {
        userId: user.id,
        isCart: true,
      },
    });
    const numItems = req.body.numItems || 1;
    await order.addProduct(product, {
      through: {
        numItems: numItems,
        totalPrice: product.price * numItems,
        userId: user.id,
      },
    });
    res.json({ order, addedProduct: product });
  } catch (err) {
    next(err);
  }
});

//GET @ /api/orders
//Access all orders.
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id, inCart: false },
      include: { model: Product },
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

//GET @ /api/orders/user/:userId
//Access all orders based on a certain user ID.
router.get("/user/:userId", authenticateToken, async (req, res) => {
  try {
    // Ensure user is only accessing their own orders
    console.log("Fetching orders for user:", req.params.userId);

    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: "Access denied." });
    }

    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isInCart: false,
      },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log("Orders: ", orders);
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to load order history" });
  }
});

//GET @ /api/cart
//Access all orders in a user's cart.
router.get("/cart", async (req, res, next) => {
  try {
    const cart = await OrderItem.findAll({
      where: { userId: req.user.id, inCart: true },
      include: [{ model: Product }, { model: Order, where: { isCart: true } }],
    });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

//UPDATE @ /api/cart/:id
//Update the user's cart.
router.put("/cart/:id", async (req, res, next) => {
  try {
    const [_, editCart] = await OrderItem.update(
      {
        numItems: req.body.numItems,
        totalPrice: req.body.totalPrice,
      },
      {
        where: { id: req.params.id, userId: req.user.id },
        include: { model: Order, where: { isCart: true } },
        returning: true,
      }
    );
    res.status(200).json(editCart);
  } catch (err) {
    next(err);
  }
});
