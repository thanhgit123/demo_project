const { getCategories } = require("../controllers/category.controller");

const categoryRouter = (app) => {
  app.get("/api/v1/categories", getCategories);
};

module.exports = {
  categoryRouter,
};
