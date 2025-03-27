const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const BalckListedTokenModel = require("../models/blackListToken.model");
const blackListTokenModel = require("../models/blackListToken.model");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email: email,
    password: hashedPassword,
  });
  const token = await user.generateAuthToken();
  return res.status(201).json({
    createdUser: user,
    token: token,
  });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email }).select("+password");
  if (!user) {
    throw res.status(401).json({
      message: "User with email does not exist",
    });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "password is not correct" });
  }
  const token = await user.generateAuthToken();
  res.cookie("token", token);
  return res.status(200).json({
    message: "Logged in sucessfully",
    token: token,
    user: user,
  });
};
module.exports.getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};
module.exports.logOutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListTokenModel.create({ token });
  return res.status(201).json({ msg: "User logged out sucessfully" });
};
