const { validationResult, body } = require("express-validator");
const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { BlackListModel } = require("../models/blacklist");
require("dotenv").config();
const AWS = require("aws-sdk");
const uuid = require("uuid");

AWS.config.update({
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECRETKEY,
  region: process.env.AWSREGION,
});

const s3 = new AWS.S3();

const registerValidation = [
  // Validate username
  body("username").notEmpty().withMessage("Username is required"),

  // Validate email
  body("email").isEmail().withMessage("Email is invalid"),

  // Validate phone number
  body("phone")
    .notEmpty()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number is required / length must be 10 digit"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, phone, password } = req.body;
    const isUserPresent = await UserModel.findOne({ email });

    if (isUserPresent)
      return res.status(409).send({ msg: "Email is already registered" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      phone,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).send({ msg: "Register Success", newUser });
  } catch (error) {
    res.status(503).send({ msg: "Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserPresent = await UserModel.findOne({ email });

    if (!isUserPresent)
      return res.status(403).send({ msg: "Email or password is incorrect" });

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserPresent.password
    );
    if (!isPasswordValid)
      return res.status(403).send({ msg: "Email or password is incorrect" });

    const token = await jwt.sign(
      { userId: isUserPresent._id },
      process.env.SECRET_ACCESS_KEY
    );

    res.status(200).send({ msg: "Login Success", token });
  } catch (error) {
    res.status(503).send({ msg: "Server Error", error: error.message });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const userId = req.userId;

    const getUser = await UserModel.findById({ _id: userId });

    res.status(200).send(getUser);
  } catch (error) {
    res.status(503).send({ msg: "Server Error", error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.userId;

    const getUser = await UserModel.findOne({ _id: userId });
    if (!getUser) return res.status(403).send({ msg: "User not found" });
    res.status(200).send({ msg: "User Found", getUser });
  } catch (error) {
    res.status(503).send({ msg: "Internal Error", error: error.message });
  }
};

const getRandomUsers = async (req, res) => {
  try {
    const currentUser = req.user;

    // Find the current user by ID and set searching to true
    const currentUserDocument = await UserModel.findOneAndUpdate(
      { _id: currentUser._id },
      { $set: { searching: true } },
      { new: true }
    );

    if (!currentUserDocument) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find another user who is searching and not the current user
    const randomUserDocument = await UserModel.findOneAndUpdate(
      {
        _id: { $ne: currentUser._id }, // Not equal to the current user
        searching: true,
      },
      { $set: { searching: true, connected: true } },
      { new: true }
    );

    if (randomUserDocument) {
      currentUserDocument.connected = true;
      currentUserDocument.save();
      // If a random user is found, pair them with the current user
      return res.status(201).json({
        message: "Successfully paired",
        users: [currentUserDocument, randomUserDocument],
      });
    } else {
      // If no suitable random user found, return waiting message
      return res.status(200).json({ message: "Waiting for a match..." });
    }
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Error: " + error.message });
  }
};

const disconnectUsers = async (req, res) => {
  try {
    const currentUser = req.user;

    // Find the current user and update searching and connected status to false
    const currentUserDocument = await UserModel.findOneAndUpdate(
      { _id: currentUser._id },
      { $set: { searching: false, connected: false } },
      { new: true }
    );

    if (!currentUserDocument) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User disconnected successfully" });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Error: " + error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, phone, email } = req.body;
    const userId = req.userId;

    let profileURL = null;
    let backgroundURL = null;
    if (req.files) {
      const profileImageFile = req.files["profileImage"];
      if (profileImageFile) {
        const profileImageBuffer = profileImageFile[0].buffer;
        const profileKey = `images/${uuid.v4()}-${
          profileImageFile[0].originalname
        }`;
        await uploadToS3(
          profileKey,
          profileImageBuffer,
          profileImageFile[0].mimetype
        );
        profileURL = `https://blog-website-s3.s3.amazonaws.com/${profileKey}`;
      }

      const backgroundImageFile = req.files["backgroundImage"];
      if (backgroundImageFile) {
        const backgroundImageBuffer = backgroundImageFile[0].buffer;
        const backgroundKey = `images/${uuid.v4()}-${
          backgroundImageFile[0].originalname
        }`;
        await uploadToS3(
          backgroundKey,
          backgroundImageBuffer,
          backgroundImageFile[0].mimetype
        );
        backgroundURL = `https://blog-website-s3.s3.amazonaws.com/${backgroundKey}`;
      }
    }

    // Update the profile in the database
    const updateProfile = await UserModel.findOne({ _id: userId });
    if (!updateProfile) {
      return res.status(403).send({ msg: "User not found" });
    }

    updateProfile.username = username;
    updateProfile.phone = phone;
    updateProfile.email = email;
    updateProfile.backgroundImage = backgroundURL;
    updateProfile.profileImage = profileURL;

    await updateProfile.save();

    res
      .status(200)
      .send({ msg: "Profile updated successfully", updateProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .send({ msg: "Internal server error", error: error.message });
  }
};

const uploadToS3 = (key, buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    s3.putObject(
      {
        Bucket: "blog-website-s3",
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const logout = async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) {
      return res.status(400).json({ msg: "Token is invalid or not provided" });
    }

    const blacklistToken = new BlackListModel({
      token: token,
    });

    await blacklistToken.save();

    res.status(200).json({ msg: "Logout success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  registerValidation,
  login,
  getLoggedInUser,
  getRandomUsers,
  updateProfile,
  getSingleUser,
  disconnectUsers,
  logout,
};
