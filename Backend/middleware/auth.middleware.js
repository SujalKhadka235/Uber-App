const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");
module.exports.authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) {
    return res.stauts(401).json({
      msg: "Unauthorized",
    });
  }
  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ err: err });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1] || req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "token missing" });
  }
  const isTokenBlackListed = await blackListTokenModel.findOne({
    token: token,
  });
  if (isTokenBlackListed) {
    return res
      .status(401)
      .json({ message: "Unauthorized Token already expired" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    res.status(500).json({ message: "something went wrong from the server" });
  }
};
