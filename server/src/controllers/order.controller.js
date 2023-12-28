const { createOrderSQL } = require("../service/order.service");

async function createOrder(req, res) {
  try {
    const orderId = await createOrderSQL(req.body);
    res.status(201).json({ orderId });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createOrder,
};
