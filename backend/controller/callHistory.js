const CallHistoryModel = require("../models/callhistorymodel");

const saveHistory = async (req, res) => {
  try {
    const callerUserId = req.userId;
    const { receiverUserId } = req.params;
    const { call_duration, call_datetime } = req.body;

    // Create a new call history entry
    const callHistory = await CallHistoryModel.create({
      caller_user_id: callerUserId,
      receiver_user_id: receiverUserId,
      call_duration,
      call_datetime,
    });

    res
      .status(200)
      .send({ message: "Call history created successfully", callHistory });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

const getCallHistoryForCaller = async (req, res) => {
  try {
    const callerUserId = req.userId;
    const callHistory = await CallHistoryModel.find({
      caller_user_id: callerUserId,
    })
      .populate("receiver_user_id")
      .sort({ call_datetime: -1 });

    if (!callHistory || callHistory.length === 0)
      return res.status(403).send({ msg: "No call history found !" });

    res.status(200).send({ callHistory });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error.message });
  }
};
const getCallDetailsById = async (req, res) => {
  try {
    const { callId } = req.params;
    const callDetails = await CallHistoryModel.findById(callId).populate(
      "receiver_user_id"
    );

    if (!callDetails)
      return res
        .status(403)
        .send({ msg: "No call details found for the specified ID!" });

    res.status(200).send({ callDetails });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error.message });
  }
};

module.exports = {
  saveHistory,
  getCallHistoryForCaller,
  getCallDetailsById,
};
