const db = require("../configs/mysql.config");
async function createOrderSQL(order) {
  try {
    const [result] = await db.execute(
      "insert into orders (user_id, purchase) values (?,?)",
      [order.user_id, order.purchase]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOrderSQL,
};
