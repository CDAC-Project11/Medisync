const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  console.log("\n---- CREATE API DEBUG ----");
  console.log("HEADER:", req.headers["authorization"]);

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;
    next();

  } catch (err) {

    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid token",
      error: err.message
    });
  }
};
