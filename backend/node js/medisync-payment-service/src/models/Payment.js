const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Payment = sequelize.define("payment", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.STRING,
  },

  razorpayPaymentId: {
    type: DataTypes.STRING,
  },

  razorpayOrderId: {
    type: DataTypes.STRING,
  },

  razorpaySignature: {
    type: DataTypes.STRING,
  },

  patientId: {
    type: DataTypes.STRING,
  },

  appointmentId: {
    type: DataTypes.STRING,
  },

  amount: {
    type: DataTypes.FLOAT,
  },

  status: {
    type: DataTypes.ENUM("CREATED", "SUCCESS", "FAILED"),
    defaultValue: "CREATED",
  },

});

module.exports = Payment;
