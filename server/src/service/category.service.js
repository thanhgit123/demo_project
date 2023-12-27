const db = require("../configs/mysql.config");
async function getCategoriesMySQL() {
  try {
    const [categories] = await db.execute("select * from category");
    return categories;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getCategoriesMySQL };
