const { categoryRouter } = require("./categories.route");
const { productsRouter } = require("./products.route");

const rootRouter = (app) => {
  categoryRouter(app);
  productsRouter(app);
};

module.exports = {
  rootRouter,
};
