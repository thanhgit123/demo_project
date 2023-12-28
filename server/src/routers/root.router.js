const { categoryRouter } = require("./categories.route");
const { emailRouter } = require("./email.route");
const { productsRouter } = require("./products.route");

const rootRouter = (app) => {
  categoryRouter(app);
  productsRouter(app);
  emailRouter(app);
};

module.exports = {
  rootRouter,
};
