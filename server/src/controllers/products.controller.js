const {
  addProductMySQL,
  getAllProductsMySQL,
  updateProductMySQL,
  getEditProduct,
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
async function updateProduct(req, res) {
  console.log(req.body);
  try {
    const { id } = req.params;
    const { name_product, price, image, stock, description, category_id } =
      req.body;
    const result = await updateProductMySQL(
      name_product,
      price,
      image,
      stock,
      description,
      category_id,
      id
    );
    res.status(200).json({
      message: "Cap nhat san pham thanh cong",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
async function editProduct(req, res) {
  const { id } = req.params;
  const result = await getEditProduct(id);
  return res.status(200).json({ data: result });
}

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  editProduct,
};
