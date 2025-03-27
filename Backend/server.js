const app = require("./app.js");
const http = require("http");
const { connectDB } = require("./db/db.js");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is runnig at port ${port}`);
});
connectDB();
