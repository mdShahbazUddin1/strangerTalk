const mongoose = require("mongoose");

const callHistorySchema = mongoose.Schema({
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
  call_duration: {
    type: Number,
    required: true,
  },
  call_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const CallHistoryModel = mongoose.model("CallHistory", callHistorySchema);

module.exports = CallHistoryModel;
