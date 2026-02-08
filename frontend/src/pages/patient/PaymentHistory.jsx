import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/payment-history.css";
import API from "../../api/api";
import { jwtDecode } from "jwt-decode";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);

      const { data } = await API.get(
        `http://localhost:8082/bills/history/${decoded.id}`
      );

      if (data.hasHistory) {
        // Transform backend format → your UI format
        const mapped = data.bills.map((b) => ({
          id: b.billId,
          date: new Date(b.date).toLocaleDateString(),
          description: `Appointment #${b.appointmentId}`,
          amount: b.amount,
          status: b.status === "PAID" ? "SUCCESS" : b.status,
          mode: b.mode,
        }));

        setPayments(mapped);
      } else {
        setPayments([]);
      }

    } catch (err) {
      console.log("History error:", err);
      setPayments([]);

    } finally {
      setLoading(false);
    }
  };
  const download = async (billId) => {
  try {
    const response = await API.get(
      `http://localhost:8082/bills/receipt/${billId}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt-${billId}.pdf`);
    document.body.appendChild(link);
    link.click();

  } catch (err) {
    alert("Failed to download receipt");
  }
};


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
        <th>Mode</th>        {/* ✅ NEW COLUMN */}
        <th>Status</th>
        <th>Receipt</th>

      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td colSpan="6" className="text-center">
            Loading payments...
          </td>
        </tr>

      ) : payments.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center text-danger">
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

            {/* ✅ PAYMENT MODE */}
            <td>
              <span className="badge bg-info text-dark">
                {p.mode}
              </span>
            </td>

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

            <td>
  <button
    className="btn btn-sm btn-outline-primary"
    onClick={() => download(p.id)}
  >
    Download
  </button>
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
