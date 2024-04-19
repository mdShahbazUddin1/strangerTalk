const express = require("express");
const {
  saveHistory,
  getCallHistoryForCaller,
  getCallDetailsById,
} = require("../controller/callHistory");
const { auth } = require("../middleware/auth");
const historyRoute = express.Router();

historyRoute.post("/history/:receiverUserId", auth, saveHistory);
historyRoute.get("/gethistory", auth, getCallHistoryForCaller);
historyRoute.get("/getCallDetailsById/:callId", auth, getCallDetailsById);

module.exports = historyRoute;
