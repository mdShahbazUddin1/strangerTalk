const { validationResult, body } = require("express-validator");
const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
      isUserPresent.password,
      password
    );
    if (isPasswordValid)
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

module.exports = {
  register,
  registerValidation,
  login,
  getLoggedInUser,
  getRandomUsers,
};
