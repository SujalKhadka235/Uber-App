const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../contollers/captain.controller");
const authMiddleware = require("../middleware/auth.middleware");
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
    body("vehcile.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 characters"),
    body("vehcile.plate")
      .isLength({ min: 3 })
      .withMessage("plate number must be at least 3 characters"),
    body("vehcile.capacity")
      .isLength({ min: 1 })
      .withMessage("capacity must be of at least 1 person"),
    body("vehcile.type")
      .isIn("car", "motorcycle", "auto")
      .withMessage("Invalid vehcile type"),
  ],
  captainController.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be provided"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 characters"),
  ],
  captainController.loginCaptain
);
router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.captainProfile
);
router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);
module.exports = router;
