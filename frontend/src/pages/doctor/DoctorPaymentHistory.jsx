import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-payment-history.css";

function DoctorPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // -------- STATIC DATA (TEMPORARY) --------
  const staticPayments = [
    {
      id: 501,
      patientName: "John Doe",
      date: "2026-01-18",
      transactionId: "TXN123456",
      amount: 500,
      mode: "UPI",
      status: "SUCCESS"
    },
    {
      id: 502,
      patientName: "Amit Sharma",
      date: "2026-01-19",
      transactionId: "TXN123457",
      amount: 1200,
      mode: "Card",
      status: "SUCCESS"
    },
    {
      id: 503,
      patientName: "Sneha Patil",
      date: "2026-01-20",
      transactionId: "TXN123458",
      amount: 800,
      mode: "Cash",
      status: "PENDING"
    },
    {
      id: 504,
      patientName: "Ravi Kumar",
      date: "2026-01-21",
      transactionId: "TXN123459",
      amount: 1500,
      mode: "UPI",
      status: "FAILED"
    }
  ];

  // -------- LOAD DATA --------
  useEffect(() => {
    setTimeout(() => {
      setPayments(staticPayments);
      setFilteredPayments(staticPayments);
      setLoading(false);
    }, 500);
  }, []);

  // -------- SEARCH BY PATIENT NAME --------
  const handleSearch = (value) => {
    setSearchText(value);

    if (!value) {
      setFilteredPayments(payments);
      return;
    }

    const filtered = payments.filter((p) =>
      p.patientName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPayments(filtered);
  };

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="doctor-payment-wrapper">

          <h1>Payment Transactions</h1>
          <p className="text-secondary text-center">
            View all patient payment status and transaction history
          </p>

          {/* SEARCH BAR */}
          <div className="row mt-3">
            <div className="col-md-4 ms-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search by patient name"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive mt-4">
            <table className="table table-bordered doctor-payment-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Amount (₹)</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Loading transactions...
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-danger">
                      No matching records found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.patientName}</td>
                      <td>{p.date}</td>
                      <td>{p.transactionId}</td>
                      <td>{p.amount}</td>
                      <td>{p.mode}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.status === "SUCCESS"
                              ? "bg-success"
                              : p.status === "FAILED"
                              ? "bg-danger"
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

export default DoctorPaymentHistory;
