const {
  addToCartMySQL,
  checkProductInCart,
  updateQuantity,
  getCartByUserId,
  deleteCartSQL,
} = require("../service/cart.service");
async function getCart(req, res) {
  const { user_id } = req.params;
  const cart = await getCartByUserId(user_id);
  res.status(200).json(cart);
}
async function addToCart(req, res) {
  try {
    const check = await checkProductInCart(req.body);
    if (!check) {
      await addToCartMySQL(req.body);
      return res.status(200).json({
        message: "Them vao gio hang thanh cong",
      });
    }
    await updateQuantity(req.body);
    return res.status(200).json({
      message: "Them vao gio hang thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
async function deleteCart(req, res) {
  const { user_id } = req.params;
  try {
    await deleteCartSQL(user_id);
    res.status(200).json({
      message: "Xoa gio hang thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCart,
  addToCart,
  deleteCart,
};
