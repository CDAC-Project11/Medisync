require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");

    app.listen(process.env.PORT, () => {
      console.log(`✅ Auth service running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB connection failed:", err.message);
  });
