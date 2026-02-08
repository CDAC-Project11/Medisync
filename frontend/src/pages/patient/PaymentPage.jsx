import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import { jwtDecode } from "jwt-decode";

function PaymentPage() {

  const [pending, setPending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);

  // 🔐 1. Get patient id from JWT
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setPatientId(decoded.id);
    }
  }, []);

  // 🔁 2. Load bills after id available
  useEffect(() => {
    if (patientId) {
      loadPending();
    }
  }, [patientId]);

  // 📥 3. CALL APPOINTMENT SERVICE DIRECTLY (8082)
  const loadPending = async () => {
    try {

      const { data } = await API.get(
        `http://localhost:8082/bills/pending/${patientId}`
      );

      setPending(data);

    } catch (err) {
      console.log("Pending error:", err);

      setPending({ hasPending: false });

    } finally {
      setLoading(false);
    }
  };

  // 💳 4. PAY SINGLE BILL
  const payNow = async (bill) => {
    try {

      const { data } = await API.post(
        "http://localhost:5005/payment/create-order",
        {
          amount: bill.amount,
          patientId: patientId,
          appointmentId: bill.appointmentId,
        }
      );

      const options = {
        key: "rzp_test_S9948L4UJ0plzY",   // ← replace later

        order_id: data.id,

        handler: async function (response) {

          await API.post(
            "http://localhost:5005/payment/verify",
            response
          );

          alert("Payment Successful");

          loadPending();
        },

        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h3>Payment Gateway</h3>

        {loading && <p>Loading...</p>}

        {/* NO PENDING */}
        {!loading && !pending?.hasPending && (
          <div className="alert alert-success">
            No payment pending
          </div>
        )}

        {/* MULTIPLE PENDING */}
        {!loading && pending?.hasPending && (
          <div className="card p-3">

            <h5 className="mb-3">Pending Bills</h5>

            {pending.bills.map((b) => (
              <div
                className="border rounded p-3 mb-2"
                key={b.billId}
              >
                <p>
                  <strong>Bill ID:</strong> {b.billId}
                </p>

                <p>
                  <strong>Appointment:</strong> {b.appointmentId}
                </p>

                <p>
                  <strong>Amount:</strong> ₹{b.amount}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => payNow(b)}
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default PaymentPage;
