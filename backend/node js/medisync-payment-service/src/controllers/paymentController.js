const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const crypto = require("crypto");
const axios = require("axios");


exports.createOrder = async (req, res) => {
  try {
    const { amount, patientId, appointmentId } = req.body;

// 👉 CHECK WITH APPOINTMENT/BILL SERVICE FIRST
const token = req.headers.authorization;

const check = await axios.get(
  process.env.BILLING_SERVICE_URL +
    `/bills/pending/${patientId}`,
  {
    headers: {
      Authorization: token,
    },
  }
);

if (!check.data.hasPending) {
  return res.status(400).json({
    message: "No payment pending",
  });
}


    // 👉 2. ALLOW ONLY IF BILL STATUS = SENT
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      orderId: order.id,
      patientId,
      appointmentId,
      amount,
      status: "CREATED",
    });

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 2️⃣ VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {

     console.log("🟢 VERIFY ENDPOINT HIT");
  console.log("BODY:", req.body);
  console.log("HEADERS:", req.headers);
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1️⃣ VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    // 2️⃣ UPDATE LOCAL PAYMENT TABLE
    const payment = await Payment.findOne({
      where: { orderId: razorpay_order_id },
    });

    await payment.update({
      status: "SUCCESS",
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    console.log(
  "CALLING SPRING = ",
  process.env.BILLING_SERVICE_URL + "/bills/mark-paid"
);


    // 3️⃣ CALL SPRING TO MARK BILL AS PAID  ✅ NEW CORRECT API
    await axios.put(
      process.env.BILLING_SERVICE_URL + "/bills/mark-paid",
      {
        appointmentId: payment.appointmentId.toString(),
        paymentId: razorpay_payment_id,
      },
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: "Payment successful" });

  } catch (error) {
    console.log("VERIFY ERROR:", error.message);

    res.status(500).json({ error: error.message });
  }
};

