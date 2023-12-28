const { createOrderDetailSQL } = require("../service/order_details.service");

async function createOrderDetail(req, res) {
  try {
    await createOrderDetailSQL(req.body);
    res.status(200).json({
      message: "thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createOrderDetail,
};
