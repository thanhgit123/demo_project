const {
  addProduct,
  getAllProducts,
} = require("../controllers/products.controller");

const productsRouter = (app) => {
  app.get("/api/v1/products", getAllProducts);
  app.post("/api/v1/products", addProduct);
};

module.exports = {
  productsRouter,
};
