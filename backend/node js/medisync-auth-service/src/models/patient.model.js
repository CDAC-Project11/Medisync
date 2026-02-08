const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define("patient", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  patient_code: DataTypes.STRING,
  name: DataTypes.STRING,
  gender: DataTypes.STRING,
  dob: DataTypes.DATEONLY,
  blood_group: DataTypes.STRING,
  mobile: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.TEXT,
  password: DataTypes.STRING
}, {
  tableName: "patient",
  timestamps: false
});

module.exports = Patient;
