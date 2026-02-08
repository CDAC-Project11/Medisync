const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/auth.middleware");


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth.routes"));



app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

module.exports = app;
