const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");


// Patient registration
router.post("/register/patient", authController.registerPatient);

// Admin doctor registration (only once)
router.post("/register/admin", authController.registerAdminDoctor);

// Login
router.post("/login", authController.login);

// Protected test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Token valid",
    user: req.user
  });
});

// POST /auth/login/doctor
router.post("/login/doctor", async (req, res) => {
  const { email, password } = req.body;

  try {
    // hardcoded admin doctor
    const doctor = {
      id: 1,
      email: "admin@medisync.com",
      passwordHash: "$2b$10$XXXXXXXXXXXX", // bcrypt hash
      role: "DOCTOR"
    };

    if (email !== doctor.email) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, doctor.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: doctor.id,
        email: doctor.email,
        role: doctor.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, role: "DOCTOR" });

  } catch (err) {
    res.status(500).json({ message: "Doctor login failed" });
  }
});



module.exports = router;
