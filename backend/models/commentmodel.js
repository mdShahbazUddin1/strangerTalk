const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  sender_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comment_datetime: {
    type: Date,
    default: Date.now,
  },
});
