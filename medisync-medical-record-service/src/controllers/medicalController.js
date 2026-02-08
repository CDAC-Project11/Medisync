const MedicalRecord = require("../models/MedicalRecord");

// ================= PATIENT =================

exports.getMyRecords = async (req, res) => {
  try {

    const records = await MedicalRecord.findAll({
      where: { patient_id: req.user.id }
    });

    const result = records.map(r => ({
      id: r.id,
      date: r.created_at,
      symptoms: r.notes,
      diagnosis: r.diagnosis,

      prescription: r.prescription
        ? JSON.parse(r.prescription)
        : []
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= DOCTOR =================

exports.getDoctorRecords = async (req, res) => {

  try {

    if (req.user.role !== "DOCTOR" && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const records = await MedicalRecord.findAll({
      where: { doctor_id: req.user.id }
    });

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= ADMIN =================

exports.getAll = async (req, res) => {
  const data = await MedicalRecord.findAll();
  res.json(data);
};


// ================= SEARCH =================

exports.search = async (req, res) => {

  const text = req.query.text || "";

  const data = await MedicalRecord.findAll();

  const filtered = data.filter(r =>
    r.diagnosis?.toLowerCase().includes(text.toLowerCase()) ||
    r.notes?.toLowerCase().includes(text.toLowerCase())
  );

  res.json(filtered);
};


// ================= DATE =================

exports.byDate = async (req, res) => {

  const date = req.query.date;

  const data = await MedicalRecord.findAll({
    where: { created_at: date }
  });

  res.json(data);
};
