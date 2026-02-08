const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const passwordUtil = require("../utils/password.util");
const jwtService = require("../services/jwt.service");


// -------------------------
// PATIENT REGISTRATION
// -------------------------
exports.registerPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      gender,
      dob,
      bloodGroup,
      address
    } = req.body;

    const exists = await Patient.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await passwordUtil.hashPassword(password);

    // generate simple patient code
    const patientCode = "P" + Date.now();

    await Patient.create({
      patient_code: patientCode,
      name,
      email,
      password: hashed,
      mobile,
      gender,
      dob,
      blood_group: bloodGroup,
      address
    });

    res.json({
      message: "Patient registered successfully",
      patientCode
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// -------------------------
// DOCTOR / ADMIN REGISTRATION
// Only allowed if none exists
// -------------------------
exports.registerAdminDoctor = async (req, res) => {
  try {
    const doctorCount = await Doctor.count();

    if (doctorCount > 0) {
      return res.status(403).json({
        message: "Admin doctor already exists"
      });
    }

    const { name, email, password, specialization } = req.body;

    const hashed = await passwordUtil.hashPassword(password);

    await Doctor.create({
      name,
      email,
      password: hashed,
      specialization
    });

    res.json({ message: "Admin doctor created" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// -------------------------
// LOGIN (PATIENT or ADMIN)
// -------------------------
// LOGIN (PATIENT or DOCTOR)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Patient.findOne({ where: { email } });
    let role = "PATIENT";

    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      role = "DOCTOR"; // ✅ FIXED
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const valid = await passwordUtil.comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwtService.generateToken({
      id: user.id,
      email: user.email,
      role
    });

    res.json({
      message: "Login successful",
      token,
      role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

