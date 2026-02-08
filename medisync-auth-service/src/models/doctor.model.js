const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Doctor = sequelize.define("doctor", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  specialization: DataTypes.STRING
}, {
  tableName: "doctor",
  timestamps: false
});

module.exports = Doctor;
