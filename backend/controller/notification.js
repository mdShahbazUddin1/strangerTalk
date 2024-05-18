const { NotificationModel } = require("../models/notify");
const UserModel = require("../models/usermodel");

const saveFollowNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const { targetUserId } = req.params;

    // Create a new follow notification
    const notification = new NotificationModel({
      type: "follow",
      follow_target: targetUserId,
      user: userId,
    });

    // Save the notification to the database
    await notification.save();

    res.status(201).send({
      success: true,
      message: "Follow notification saved successfully",
    });
  } catch (error) {
    console.error("Error saving follow notification:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getUnseenNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await NotificationModel.find({
      type: "follow",
      follow_target: userId,
      seen: false,
    }).sort({ createdAt: -1 });

    // Populate the user field to get the name of the follower
    const populatedNotifications = await NotificationModel.populate(
      notifications,
      { path: "user", select: "username" }
    );

    res
      .status(200)
      .json({ success: true, notifications: populatedNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getallNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await NotificationModel.find({
      type: "follow",
      follow_target: userId,
    }).sort({ createdAt: -1 });

    // Populate the user field to get the name of the follower
    const populatedNotifications = await NotificationModel.populate(
      notifications,
      { path: "user", select: "username" }
    );

    res
      .status(200)
      .json({ success: true, notifications: populatedNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const markNotificationUnseen = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await NotificationModel.updateMany(
      { follow_target: userId },
      { seen: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as seen for the logged-in user",
    });
  } catch (error) {
    console.error(
      "Error marking all notifications as seen for the logged-in user:",
      error
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from request (assuming it's set in middleware)

    // Delete all notifications for the specific user
    const result = await NotificationModel.deleteMany({
      follow_target: userId,
    });

    res.status(200).json({
      success: true,
      message: "All notifications deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const sendCallNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const { receiverId } = req.params;

    // Create a new call notification
    const callNotification = new NotificationModel({
      type: "call",
      follow_target: receiverId,
      user: userId,
    });

    // Save the call notification to the database
    await callNotification.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Call notification sent successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error sending call notification:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRecentCallNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    // Calculate the timestamp for 5 seconds ago
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

    // Query the database for call notifications within the last 5 seconds
    const recentCallNotifications = await NotificationModel.find({
      type: "call",
      follow_target: userId, // Assuming the user is the callee
      createdAt: { $gte: thirtySecondsAgo }, // Match notifications created within the last 5 seconds
    })
      .sort({ createdAt: -1 })
      .populate("follow_target")
      .populate("user"); // Populate the details of the user who initiated the call
    // Populate the details of the user who is being called

    // Send the recent call notifications as the response
    res.status(200).json({ success: true, recentCallNotifications });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving recent call notifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLatestCallDetails = async (req, res) => {
  try {
    const userId = req.userId;

    // Calculate the timestamp for 30 seconds ago
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

    // Find the latest call notification for the user within the last 30 seconds
    const latestCallNotification = await NotificationModel.findOne({
      type: "call",
      follow_target: userId, // Assuming the user is the callee
      createdAt: { $gte: thirtySecondsAgo }, // Match notifications created within the last 30 seconds
    }).sort({ createdAt: -1 }); // Sort by createdAt field in descending order

    if (!latestCallNotification) {
      return res
        .status(404)
        .json({ success: false, message: "No recent call found" });
    }

    // Retrieve the ID of the user who made the call (caller)
    const callerId = latestCallNotification.user;

    // Retrieve details of the caller from the User model
    const callerDetails = await UserModel.findById(callerId);

    if (!callerDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Caller details not found" });
    }

    // Send the details of the caller along with the call notification
    res.status(200).json({ success: true, callerDetails });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving latest call details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  saveFollowNotification,
  getUnseenNotifications,
  markNotificationUnseen,
  sendCallNotification,
  getRecentCallNotifications,
  getLatestCallDetails,
  getallNotifications,
  deleteAllNotifications,
};
