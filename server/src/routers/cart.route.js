const {
  addToCart,
  getCart,
  deleteCart,
} = require("../controllers/cart.controller");

const cartRouter = (app) => {
  app.get("/api/v1/cart/:user_id", getCart);
  app.post("/api/v1/cart", addToCart);
  app.delete("/api/v1/cart/:user_id", deleteCart);
};

module.exports = { cartRouter };
