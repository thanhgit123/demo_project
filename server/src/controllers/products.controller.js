const {
  addProductMySQL,
  getAllProductsMySQL,
} = require("../service/products.service");
async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsMySQL();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}
async function addProduct(req, res) {
  try {
    const result = await addProductMySQL(req.body);
    if (!result) {
      return res.status(500).json({
        message: "Co loi khi them san pham",
      });
    }
    const products = await getAllProductsMySQL();
    res.status(200).json({
      message: "Them san pham thanh cong",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
  addProduct,
};
