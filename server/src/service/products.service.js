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
async function updateProductMySQL(
  name_product,
  price,
  image,
  stock,
  description,
  category_id,
  product_id
) {
  try {
    const [result] = await db.execute(
      "update products set name_product = ?, price = ?, image = ?, stock = ?, description = ?, category_id = ? where product_id = ?",
      [name_product, price, image, stock, description, category_id, product_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function getEditProduct(product_id) {
  try {
    const [result] = await db.execute(
      "select * from products join category on products.category_id = category.category_id where product_id = ?",
      [product_id]
    );

    return result[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProductsMySQL,
  addProductMySQL,
  updateProductMySQL,
  getEditProduct,
};
