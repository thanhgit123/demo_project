const {
  addProduct,
  getAllProducts,
  updateProduct,
  editProduct,
} = require("../controllers/products.controller");

const productsRouter = (app) => {
  app.get("/api/v1/products", getAllProducts);
  app.post("/api/v1/products", addProduct);
  app.put("/api/v1/products/:id", updateProduct);
  app.get("/api/v1/editProduct/:id", editProduct);
};

module.exports = {
  productsRouter,
};
