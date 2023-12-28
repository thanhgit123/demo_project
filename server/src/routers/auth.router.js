const { register, login } = require("../controllers/auth.controller");

const authRouter = (app) => {
  //sign up
  app.post("/api/auth/signup", register);
  //login
  app.post("/api/auth/login", login);
};

module.exports = { authRouter };
