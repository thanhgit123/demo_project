const { createOrder } = require("../controllers/order.controller");

const orderRouter = (app) => {
  app.post("/api/v1/orders", createOrder);
};
module.exports = {
  orderRouter,
};
