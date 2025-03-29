const captainModel = require("../models/captain.model");
module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  type,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !type
  ) {
    throw new Error("Credentials missing");
  }
  const captain = await captainModel.create({
    fullName: {
      firstName: firstName,
      lastName: lastName,
    },
    email: email,
    password: password,
    vehcile: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehcileType: type,
    },
  });
  return captain;
};
