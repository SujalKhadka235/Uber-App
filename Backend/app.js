require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Yes it is working");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

module.exports = app;
