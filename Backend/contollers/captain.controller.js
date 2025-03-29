const captainModel = require("../models/captain.model");
const { createCaptain } = require("../services/captain.service");
const { validationResult } = require("express-validator");
module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({ error: error.array() });
  }
  const {
    fullName: { firstName, lastName },
    password,
    email,
    vehcile: { color, plate, capacity, type },
  } = req.body;
  const hashedPassword = await captainModel.hashPassword(password);
  const existingUser = await captainModel.findOne({ email: email });
  if (existingUser) {
    return (
      res.status(400), json({ msg: "User with this email already exists" })
    );
  }
  console.log(req.body);
  const captain = await createCaptain({
    firstName: firstName,
    lastName: lastName,
    color: color,
    plate: plate,
    capacity: capacity,
    type: type,
    email: email,
    password: hashedPassword,
  });
  const token = await captain.generateAuthToken();
  return res.json({
    msg: "Captain has been created",
    createdCaptain: captain,
    token: token,
  });
};
module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { password, email } = req.body;
    const existingCaptain = await captainModel
      .findOne({ email: email })
      .select("+password");
    if (!existingCaptain) {
      return res
        .status(401)
        .json({ message: "Captain with email does not exist" });
    }
    const isPasswordAccurate = await existingCaptain.comparePassword(password);
    if (!isPasswordAccurate) {
      return res.status(401).json({ message: "password does not match" });
    }
    const token = await existingCaptain.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({
      message: "Sucessfully logged in",
      token: token,
      caprain: existingCaptain,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
