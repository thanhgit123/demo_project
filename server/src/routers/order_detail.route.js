const { createOrderDetail } = require("../controllers/order_detail.controller");

const orderDetailRouter = (app) => {
  app.post("/api/v1/order_details", createOrderDetail);
};
module.exports = {
  orderDetailRouter,
};
