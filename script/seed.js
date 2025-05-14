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
      points: 100000,
      role: "admin",
      imageSrc: "player2.png",
    }),
    User.create({
      username: "vida",
      password: await hashPass("hardtoguess123"),
      email: "vida@gmail.com",
      points: 100000,
      role: "admin",
      imageSrc: "player.png",
    }),
    User.create({
      username: "maddd4tea5",
      password: await hashPass("ilovetea"),
      email: "nowbrewing456@yahoo.com",
      points: 200,
      role: "customer",
      imageSrc: "player.png",
    }),
    User.create({
      username: "teafiend",
      password: await hashPass("givemeteanwo"),
      email: "janedoe@gmail.com",
      points: 200,
      role: "customer",
      imageSrc: "player.png",
    }),
    User.create({
      username: "elmroastery",
      password: await hashPass("mxmanager"),
      email: "elmroastery@gmail.com",
      points: 2000,
      role: "customer",
      imageSrc: "player.png",
    }),
    User.create({
      username: "starbucks",
      password: await hashPass("secretrecipe"),
      email: "kevin.johnson@starbucks.com",
      points: 40000,
      role: "customer",
      imageSrc: "player.png",
    }),
    User.create({
      username: "liam",
      password: await hashPass("dynamo"),
      email: "liam@eirishexports.com",
      points: 6000,
      role: "customer",
      imageSrc: "player.png",
    }),
    User.create({
      username: "ericaray",
      password: await hashPass("dynamo"),
      email: "erica7555@gmail.com",
      points: 300,
      role: "customer",
      imageSrc: "player.png",
    }),
  ]);

  //Example product data.
  const products = await Promise.all([
    Product.create({
      name: "Earl Grey Tea",
      price: 160,
      type: "black",
      caffeine: 40,
      imageSrc: "earlgrey.webp",
      description:
        "Straight outta Britain, this black tea has notes of lavender that will straight up put you to sleep.",
      location: { name: "United Kingdom", latitude: 55, longitude: -3 },
    }),
    Product.create({
      name: "White Peach Tea",
      price: 190,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description: "Summertime vibes, if you like that then buy it.",
      location: { name: "Georgia, US", latitude: 33, longitude: -83 },
    }),
    Product.create({
      name: "Ginger Tea",
      price: 110,
      type: "herbal",
      caffeine: 0,
      imageSrc: "ginger.webp",
      description: "So spicy! Not really, but, you know.",
      location: { name: "Nepal", latitude: 28, longitude: 84 },
    }),
    Product.create({
      name: "Mint Leaves",
      price: 90,
      type: "herbal",
      caffeine: 0,
      imageSrc: "mintleaves.png",
      description:
        "Who doesn't love mint? You, if you don't add this to your cart.",
      location: { name: "California, US", latitude: 36, longitude: -119 },
    }),
    Product.create({
      name: "Rose Hips",
      price: 190,
      type: "herbal",
      caffeine: 0,
      imageSrc: "blackrose.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Nebraska, US", latitude: 41, longitude: -99 },
    }),
    Product.create({
      name: "White Assam Tea",
      price: 130,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "India", latitude: 21, longitude: 82 },
    }),
    Product.create({
      name: "Hoji Cha Tea",
      price: 450,
      type: "green",
      caffeine: 35,
      imageSrc: "hojicha.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Kukicha Kamakura Tea",
      price: 850,
      type: "green",
      caffeine: 30,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Sencha Tea",
      price: 160,
      type: "green",
      caffeine: 32,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Gen-mai Cha",
      price: 320,
      type: "green",
      caffeine: 32,
      imageSrc: "sencha.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Chamomile Tea",
      price: 120,
      type: "herbal",
      caffeine: 0,
      imageSrc: "chrystanthemum.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "India", latitude: 21, longitude: 82 },
    }),
    Product.create({
      name: "Irish Breakfast Tea",
      price: 110,
      type: "black",
      caffeine: 70,
      imageSrc: "earlgrey.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Ireland", latitude: 53, longitude: -8 },
    }),
    Product.create({
      name: "English Breakfast Tea",
      price: 30,
      type: "black",
      caffeine: 90,
      imageSrc: "engbk.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "United Kingdom", latitude: 55, longitude: -3 },
    }),
    Product.create({
      name: "Apricot White Tea",
      price: 80,
      type: "white",
      caffeine: 0,
      imageSrc: "whitepeach.webp",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Turkey", latitude: 38, longitude: 35 },
    }),
    Product.create({
      name: "Hibiscus Tea",
      price: 100,
      type: "herbal",
      caffeine: 0,
      imageSrc: "blackrose.png",
      description:
        "Sweet and floral with a little edge to it. It's in your area, you might as well.",
      location: { name: "Japan", latitude: 37, longitude: 136 },
    }),
    Product.create({
      name: "Chrysanthemum Tea",
      price: 140,
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
    Order.create({
      userId: users[0].id,
      isInCart: true,
      subTotal: 100,
      status: "complete",
    }),
    Order.create({
      userId: users[0].id,
      isInCart: true,
      subTotal: 100,
      status: "complete",
    }),
    Order.create({
      userId: users[1].id,
      isInCart: true,
      subTotal: 100,
      status: "complete",
    }),
    Order.create({
      userId: users[1].id,
      isInCart: true,
      subTotal: 100,
      status: "complete",
    }),
    Order.create({
      userId: users[2].id,
      isInCart: true,
      subTotal: 100,
      status: "complete",
    }),
    Order.create({
      userId: users[2].id,
      isInCart: false,
      subTotal: 20.99,
      status: "complete",
    }),
    Order.create({
      userId: users[3].id,
      isInCart: false,
      subTotal: 25.99,
      status: "complete",
    }),
    Order.create({
      userId: users[3].id,
      isInCart: false,
      subTotal: 23.99,
      status: "complete",
    }),
    Order.create({
      userId: users[4].id,
      isInCart: false,
      subTotal: 30.99,
      status: "complete",
    }),
    Order.create({
      userId: users[4].id,
      isInCart: false,
      subTotal: 10.99,
      status: "complete",
    }),
    Order.create({
      userId: users[5].id,
      isInCart: false,
      subTotal: 8.99,
      status: "complete",
    }),
  ]);

  await OrderItem.create({
    orderId: orders[2].id,
    productId: products[0].id,
    quantity: 2,
    totalPriceForProduct: 2 * products[0].price,
  });

  await OrderItem.create({
    orderId: orders[2].id,
    productId: products[1].id,
    quantity: 1,
    totalPriceForProduct: products[1].price,
  });

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
