const CallHistoryModel = require("../models/callhistorymodel");
const FeedbackModel = require("../models/feedbackmodel");

const submitFeedback = async (req, res) => {
  const currentuserId = req.userId;
  const { userId } = req.params;

  const { rating, feedbackContent } = req.body;

  try {
    const newFeedback = new FeedbackModel({
      caller_user_id: currentuserId,
      receiver_user_id: userId,
      rating,
      feedbackContent,
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(200).send({
      success: true,
      message: "Feedback submitted successfully",
      newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback. Please try again later.",
    });
  }
};

const getAllFeedbackByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    // Find all feedback where the receiver_user_id matches the userId
    const feedback = await FeedbackModel.find({ receiver_user_id: userId })
      .populate("caller_user_id", "username") // Populate caller_user_id to get username
      .populate("call_id") // Populate call_id to get call details
      .select("-_id rating feedbackContent"); // Select only necessary fields

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback. Please try again later.",
    });
  }
};

const getAllFeedbackGivenByUserId = async (req, res) => {
  const userId = req.userId;
  try {
    // Find all feedback where the caller_user_id matches the userId
    const feedback = await FeedbackModel.find({ caller_user_id: userId })
      .populate("receiver_user_id", "username")
      .select("-_id rating feedbackContent"); // Select only necessary fields

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback. Please try again later.",
    });
  }
};
const getAllFeedbackByReceiverId = async (req, res) => {
  const receiverUserId = req.params.receiverUserId;

  try {
    // Find all feedback entries where the receiver_user_id matches the provided receiverUserId
    const feedback = await FeedbackModel.find({
      receiver_user_id: receiverUserId,
    }).populate("caller_user_id", "username"); // Populate the caller_user_id field with the name

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback. Please try again later.",
    });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbackByUserId,
  getAllFeedbackGivenByUserId,
  getAllFeedbackByReceiverId,
};
