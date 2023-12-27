const { getCategoriesMySQL } = require("../service/category.service");

async function getCategories(req, res) {
  try {
    const categories = await getCategoriesMySQL();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCategories,
};
