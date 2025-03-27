const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [3, "firstName must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "lastName must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already taken"],
    minlength: [5, "email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [5, "password must be 5 characters long"],
    select: false,
  },
  socketId: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
