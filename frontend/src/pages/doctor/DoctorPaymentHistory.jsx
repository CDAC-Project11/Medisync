import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-payment-history.css";
import API from "../../api/api";
import { jwtDecode } from "jwt-decode";

function DoctorPaymentHistory() {

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // -------- LOAD FROM BACKEND --------
useEffect(() => {
  loadPayments();
}, []);

const loadPayments = async (search = "") => {
  try {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);

    const { data } = await API.get("/bills/doctor/all", {
      params: {
        doctorId: decoded.id,
        search: search
      }
    });

    console.log("RAW FROM API:", data);     // 👈 ADD

    const mapped = data.map((b) => ({
      id: b.billId,
      patientName: b.patientName,
      date: new Date(b.date).toLocaleDateString(),
      transactionId: `BILL-${b.billId}`,
      amount: b.amount,
      mode: b.mode,
      status: b.status === "PAID" ? "SUCCESS" : b.status
    }));

    console.log("MAPPED:", mapped);         // 👈 ADD

    setPayments(mapped);
    setFilteredPayments(mapped);

  } catch (err) {
    console.log("Doctor history error:", err);
    setPayments([]);
    setFilteredPayments([]);

  } finally {
    setLoading(false);
  }
};



  // -------- SEARCH BY PATIENT NAME --------
  const handleSearch = (value) => {
  setSearchText(value);

  // ✅ If empty → show all
  if (!value || value.trim() === "") {
    setFilteredPayments(payments);
    return;
  }

  const filtered = payments.filter((p) =>
    (p.patientName || "")
      .toLowerCase()
      .includes(value.toLowerCase())
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
