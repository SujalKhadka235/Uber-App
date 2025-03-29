const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const captainSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [3, "firstName should be atleast 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "lastName should be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    unique: [true, "Email already in use"],
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehcile: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate number must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "capacity must at least be 1"],
    },
    vehcileType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});
captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
