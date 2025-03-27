const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../contollers/user.contoller.js");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("firstname must be 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters long"),
  ],
  userController.registerUser
);

module.exports = router;
