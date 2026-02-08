const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MedicalRecord = sequelize.define("medical_record", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: DataTypes.BIGINT,
  doctor_id: DataTypes.BIGINT,
  diagnosis: DataTypes.STRING,
  prescription: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  created_at: DataTypes.DATE
}, {
  tableName: "medical_record",
  timestamps: false
});

module.exports = MedicalRecord;
