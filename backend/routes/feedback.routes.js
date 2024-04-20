const express = require("express");
const feedBackRoute = express.Router();
const { auth } = require("../middleware/auth");
const {
  submitFeedback,
  getAllFeedbackByUserId,
  getAllFeedbackGivenByUserId,
  getAllFeedbackByReceiverId,
} = require("../controller/feedback");

feedBackRoute.post("/save/:userId", auth, submitFeedback);
feedBackRoute.get("/getfeedback", auth, getAllFeedbackByUserId);
feedBackRoute.get("/getgivenfeedback", auth, getAllFeedbackGivenByUserId);
feedBackRoute.get(
  "/getfeedbackofrandom/:receiverUserId",
  auth,
  getAllFeedbackByReceiverId
);

module.exports = feedBackRoute;
