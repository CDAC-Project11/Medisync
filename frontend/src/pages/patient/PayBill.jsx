import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PayBill() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8082/payments/create/${appointmentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const order = await res.json();

    openRazorpay(order);
  };

  const openRazorpay = (order) => {
    const options = {
      key: "rzp_test_YOUR_KEY",
      amount: order.amount,
      currency: "INR",
      name: "MediSync",
      description: "Consultation Bill",

      order_id: order.id,

      handler: async function (response) {
        await verifyPayment(response);
      },

      prefill: {
        name: "Patient",
        email: "patient@mail.com",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (data) => {
    const token = sessionStorage.getItem("token");

    await fetch("http://localhost:8082/payments/success", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpayOrderId: data.razorpay_order_id,
        razorpayPaymentId: data.razorpay_payment_id,
        razorpaySignature: data.razorpay_signature,
      }),
    });

    alert("Payment Successful");
    navigate("/patient/bills");
  };

  return <h3>Opening Payment...</h3>;
}
