const bcryptjs = require("bcryptjs");

const {
  db,
  models: { User, Order, Product },
} = require("../server/db");

async function hashPass(password) {
  const result = await bcryptjs.hash(password, 8);
  return result;
}

async function seed() {
  await db.sync({ force: true });

  //Example user data.
  const users = await Promise.all([
    User.create({
      username: "leo",
      password: await hashPass("qwkp"),
      email: "leorodriguez916@gmail.com",
      role: "admin",
    }),
    User.create({
      username: "vida",
      password: await hashPass("hardtoguess123"),
      email: "vida@gmail.com",
      role: "admin",
    }),
    User.create({
      username: "maddd4tea5",
      password: await hashPass("ilovetea"),
      email: "nowbrewing456@yahoo.com",
      role: "customer",
    }),
    User.create({
      username: "teafiend",
      password: await hashPass("givemeteanwo"),
      email: "janedoe@gmail.com",
      role: "customer",
    }),
    User.create({
      username: "elmroastery",
      password: await hashPass("mxmanager"),
      email: "elmroastery@gmail.com",
      role: "customer",
    }),
    User.create({
      username: "starbucks",
      password: await hashPass("secretrecipe"),
      email: "kevin.johnson@starbucks.com",
      role: "customer",
    }),
  ]);

  //Example product data.
  const products = await Promise.all([
    Product.create({
      name: "Earl Grey Tea",
      price: 15.99,
      type: "black",
      caffeine: 40,
      imageSrc: "earlgrey.webp",
      description:
        "Straight outta Britain, this black tea has notes of lavender that will straight up put you to sleep.",
      location: { name: "United Kingdom", latitude: 55, longitude: -3 },
    }),
    Product.create({
      name: "White Peach Tea",
      price: 18.99,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description: "Summertime vibes, if you like that then buy it.",
      location: { name: "Georgia, US", latitude: 33, longitude: -83 },
    }),
    Product.create({
      name: "Ginger Tea",
      price: 10.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "ginger.webp",
      description: "So spicy! Not really, but, you know.",
      location: { name: "Nepal", latitude: 28, longitude: 84 },
    }),
    Product.create({
      name: "Mint Leaves",
      price: 8.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "mintleaves.png",
      description:
        "Who doesn't love mint? You, if you don't add this to your cart.",
      location: { name: "California, US", latitude: 36, longitude: -119 },
    }),
    Product.create({
      name: "Rose Hips",
      price: 18.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "blackrose.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Nebraska, US", latitude: 41, longitude: -99 },
    }),
    Product.create({
      name: "White Assam Tea",
      price: 12.99,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "India", latitude: 21, longitude: 82 },
    }),
    Product.create({
      name: "Hoji Cha Tea",
      price: 18.49,
      type: "green",
      caffeine: 35,
      imageSrc: "hojicha.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Kukicha Kamakura Tea",
      price: 21.99,
      type: "green",
      caffeine: 30,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Sencha Tea",
      price: 15.99,
      type: "green",
      caffeine: 32,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Gen-mai Cha",
      price: 18.99,
      type: "green",
      caffeine: 32,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Chamomile Tea",
      price: 11.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "chrystanthemum.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "India", latitude: 21, longitude: 82 },
    }),
    Product.create({
      name: "Irish Breakfast Tea",
      price: 10.99,
      type: "black",
      caffeine: 70,
      imageSrc: "earlgrey.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Ireland", latitude: 53, longitude: -8 },
    }),
    Product.create({
      name: "English Breakfast Tea",
      price: 10.49,
      type: "black",
      caffeine: 90,
      imageSrc: "engbk.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "United Kingdom", latitude: 55, longitude: -3 },
    }),
    Product.create({
      name: "Apricot White Tea",
      price: 14.99,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Turkey", latitude: 38, longitude: 35 },
    }),
    Product.create({
      name: "Hibiscus Tea",
      price: 8.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "blackrose.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Chrysanthemum Tea",
      price: 18.99,
      type: "herbal",
      caffeine: 0,
      imageSrc: "chrystanthemum.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
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

  // for (let i = 0; i < orders.length; i++) {
  //   const randProducts = giveMeRandomProducts();
  //   for (let j = 0; j < randProducts.length; j++) {
  //     await users[i].addOrder(orders[i]);
  //     await orders[i].addProduct(randProducts[j], {
  //       through: {
  //         numItems: 1,
  //         totalPrice: randProducts[j].price,
  //         imageSrc: "",
  //         userId: users[i].id,
  //       },
  //     });
  //   }
  // }

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
