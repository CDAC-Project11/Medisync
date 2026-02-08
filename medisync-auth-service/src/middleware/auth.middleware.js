const jwtService = require("../services/jwt.service");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwtService.verifyToken(token);

    req.user = decoded; // attach user info
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
