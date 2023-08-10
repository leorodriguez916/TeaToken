const {
  db,
  models: { User, Order, Product },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });

  //Example user data.
  const users = await Promise.all([
    User.create({
      username: "leorodriguez",
      password: "hardtoguess123",
      passwordConfirm: "hardtoguess123",
      email: "leorodriguez916@gmail.com",
      role: "admin",
    }),
    User.create({
      username: "vidafeng",
      password: "hardtoguess123",
      passwordConfirm: "hardtoguess123",
      email: "vida@gmail.com",
      role: "admin",
    }),
    User.create({
      username: "maddd4tea5",
      password: "ilovetea",
      passwordConfirm: "ilovetea",
      email: "nowbrewing456@yahoo.com",
    }),
    User.create({
      username: "teafiend",
      password: "givemeteanwo",
      passwordConfirm: "givemeteanwo",
      email: "janedoe@gmail.com",
    }),
    User.create({
      username: "elmroastery",
      password: "mxmanager",
      passwordConfirm: "mxmanager",
      email: "elmroastery@gmail.com",
    }),
    User.create({
      username: "starbucks",
      password: "yoonyunbusta",
      passwordConfirm: "yoonyunbusta",
      email: "kevin.johnson@starbucks.com",
    }),
  ]);

  //Example product data.
  const products = await Promise.all([
    Product.create({
      name: "Earl Grey Tea",
      price: 15.99,
      imageSrc: "earlgrey.webp",
      description:
        "Straight outta Britain, this black tea has notes of lavender that will straight up put you to sleep.",
    }),
    Product.create({
      name: "White Peach Tea",
      price: 18.99,
      imageSrc: "whitepeach.webp",
      description: "Summertime vibes, if you like that then buy it.",
    }),
    Product.create({
      name: "Ginger Tea",
      price: 18.99,
      imageSrc: "ginger.webp",
      description: "So spicy! Not really, but, you know.",
    }),
    Product.create({
      name: "Mint Leaves",
      price: 18.99,
      imageSrc: "mintleaves.png",
      description:
        "Who doesn't love mint? You, if you don't add this to your cart.",
    }),
    Product.create({
      name: "Black Rose Tea",
      price: 18.99,
      imageSrc: "blackrose.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
    }),
  ]);

  //Example order data.
  const orders = await Promise.all([
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: false, subTotal: 20.99 }),
    Order.create({ isCart: false, subTotal: 25.99 }),
    Order.create({ isCart: false, subTotal: 23.99 }),
    Order.create({ isCart: false, subTotal: 30.99 }),
    Order.create({ isCart: false, subTotal: 10.99 }),
    Order.create({ isCart: false, subTotal: 8.99 }),
  ]);

  // Generate products.
  const giveMeRandomProducts = () => {
    const randomNum = () => Math.floor(Math.random() * (products.length - 10));
    let counter = 0;
    let idxAdded = {};
    while (counter < randomNum() + 1) {
      const randIdx = randomNum();
      if (idxAdded[randIdx]) continue;
      idxAdded[randIdx] = products[randIdx];
      counter++;
    }
    return Object.values(idxAdded);
  };

  for (let i = 0; i < orders.length; i++) {
    const randProducts = giveMeRandomProducts();
    for (let j = 0; j < randProducts.length; j++) {
      await users[i].addOrder(orders[i]);
      await orders[i].addProduct(randProducts[j], {
        through: {
          numItems: 1,
          totalPrice: randProducts[j].price,
          imageSrc: "",
          userId: users[i].id,
        },
      });
    }
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// We export the seed function for testing purposes. (See: `./seed.spec.js`) Note: Not currently present.
module.exports = seed;