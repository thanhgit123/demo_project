const db = require("../configs/mysql.config");
async function createOrderDetailSQL(order) {
  try {
    console.log(order);
    const [result] = await db.execute(
      "insert into order_detail(order_detail_id, product_id, quantity) values (?,?,?)",
      [order.order_id, order.product_id, order.quantity]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOrderDetailSQL,
};
