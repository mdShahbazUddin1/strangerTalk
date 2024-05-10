const express = require("express");
const multer = require("multer");
const userRoute = express.Router();
const {
  registerValidation,
  register,
  login,
  getLoggedInUser,
  getRandomUsers,
  updateProfile,
  getSingleUser,
  logout,
  disconnectUsers,
  followUser,
  getMutualFriends,
  checkFollowStatus,
  checkRandomUserConnection,
  sendOtp,
  verifyOtp,
} = require("../controller/userController");
const { auth } = require("../middleware/auth");

userRoute.use(express.json({ limit: "50mb" }));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Set the maximum file size to 50MB
  },
});

userRoute.post("/register", registerValidation, register);
userRoute.post("/sendotp", sendOtp);
userRoute.post("/verifyotp", verifyOtp);
userRoute.post("/login", login);
userRoute.get("/getuser", auth, getLoggedInUser);
userRoute.get("/getsingleuser", auth, getSingleUser);
userRoute.get("/getrandom", auth, getRandomUsers);
userRoute.put(
  "/editprofile",
  auth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  updateProfile
);
userRoute.get("/logout", auth, logout);
userRoute.get("/disconnect", auth, disconnectUsers);
userRoute.post("/follow/:userIdToFollow", auth, followUser);

userRoute.get("/friendlist", auth, getMutualFriends);
userRoute.get("/checkfollow/:userId", auth, checkFollowStatus);
userRoute.get("/checkstatus/:randomId", auth, checkRandomUserConnection);

module.exports = userRoute;
