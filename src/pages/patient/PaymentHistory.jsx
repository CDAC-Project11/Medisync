import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/payment-history.css";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------- STATIC DATA (TEMPORARY) --------
  const staticPayments = [
    {
      id: 101,
      date: "2026-01-18",
      description: "Doctor Consultation",
      amount: 500,
      status: "SUCCESS"
    },
    {
      id: 102,
      date: "2026-01-20",
      description: "Blood Test",
      amount: 1200,
      status: "SUCCESS"
    },
    {
      id: 103,
      date: "2026-01-22",
      description: "X-Ray Charges",
      amount: 800,
      status: "PENDING"
    }
  ];

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setPayments(staticPayments);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="payment-wrapper">

          <h1>Payment History</h1>
          <p className="text-secondary text-center">
            All your medical payments in one place
          </p>

          <div className="table-responsive mt-4">
            <table className="table table-bordered payment-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading payments...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-danger">
                      No payment history found
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.date}</td>
                      <td>{p.description}</td>
                      <td>{p.amount}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.status === "SUCCESS"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default PaymentHistory;
