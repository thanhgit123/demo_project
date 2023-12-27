const db = require("../configs/mysql.config");
async function getAllProductsMySQL() {
  try {
    const [products] = await db.execute("select * from products");
    return products;
  } catch (error) {
    console.log(error);
  }
}
async function addProductMySQL(newProduct) {
  const { name_product, price, image, stock, description, category_id } =
    newProduct;
  try {
    const [result] = await db.execute(
      "insert into products (name_product,image,price,stock,description,category_id) values (?,?,?,?,?,?)",
      [name_product, image, +price, +stock, description, +category_id]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProductsMySQL,
  addProductMySQL,
};
