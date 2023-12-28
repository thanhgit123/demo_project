const {
  addProduct,
  getAllProducts,
  updateProduct,
  editProduct,
  deleteProduct,
  getProductsBySearch,
} = require("../controllers/products.controller");

const productsRouter = (app) => {
  app.get("/api/v1/products", getAllProducts);
  app.get("/api/v1/products/search", getProductsBySearch);
  app.post("/api/v1/products", addProduct);
  app.put("/api/v1/products/:id", updateProduct);
  // app.get("/api/v1/editProduct/:id", editProduct);
  app.delete("/api/v1/deleteProduct/:id", deleteProduct);
};

module.exports = {
  productsRouter,
};
