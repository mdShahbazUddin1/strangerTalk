const expres = require("express");
const { auth } = require("../middleware/auth");
const {
  saveFollowNotification,
  getUnseenNotifications,
  markNotificationUnseen,
  sendCallNotification,
  getRecentCallNotifications,
  getLatestCallDetails,
  getallNotifications,
  deleteAllNotifications,
} = require("../controller/notification");
const notifyRoute = expres.Router();

notifyRoute.post("/save/:targetUserId", auth, saveFollowNotification);
notifyRoute.get("/getnoti", auth, getUnseenNotifications);
notifyRoute.get("/getallnoti", auth, getallNotifications);
notifyRoute.post("/markseen", auth, markNotificationUnseen);
notifyRoute.delete("/deletenoti", auth, deleteAllNotifications);
notifyRoute.post("/call/:receiverId", auth, sendCallNotification);
notifyRoute.get("/getcall", auth, getRecentCallNotifications);
notifyRoute.get("/getcallerdetails", auth, getLatestCallDetails);

module.exports = {
  notifyRoute,
};
