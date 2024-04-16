const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  caller_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  call_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CallHistory",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  feedback_datetime: {
    type: Date,
    default: Date.now,
  },
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedbackModel;
