const express = require("express");
const userRoute = express.Router();
const {
  registerValidation,
  register,
  login,
  getLoggedInUser,
  getRandomUsers,
} = require("../controller/userController");
const { auth } = require("../middleware/auth");

userRoute.post("/register", registerValidation, register);
userRoute.post("/login", login);
userRoute.get("/getuser", auth, getLoggedInUser);
userRoute.get("/getrandom", auth, getRandomUsers);

module.exports = userRoute;
