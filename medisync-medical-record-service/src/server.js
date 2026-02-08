require("dotenv").config();

const express = require("express");
const cors = require("cors");

const medicalRoutes = require("./routes/medicalRoutes");

require("./config/db");   // 👈 ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("Medical Record Service Running");
});

app.listen(8084, () => {
  console.log("Server running on 8084");
});


app.use("/medical-records", medicalRoutes);
