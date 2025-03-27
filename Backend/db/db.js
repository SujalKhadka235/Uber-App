const mongoose = require("mongoose");
const URL = process.env.CONNECTION_STRING;
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URL);
    console.log(
      "Database has been connected to: ",
      connection.connection.db.databaseName
    );
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = { connectDB };
