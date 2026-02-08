require("dotenv").config();

const app = require("./app");
const { connectDB, sequelize } = require("./config/db");

const PORT = process.env.PORT || 5005;

const start = async () => {
  await connectDB();

  // create tables automatically
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Payment Service running on ${PORT}`);
  });
};

start();
