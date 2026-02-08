import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-bill.css";

function DoctorBill() {
  const location = useLocation();
  const navigate = useNavigate();
  const consultation = location.state?.consultation;

  // Redirect if opened without data
  useEffect(() => {
    if (!consultation) {
      alert("No consultation data found");
      navigate("/doctor/appointments");
    }
  }, []);

  // -------- PATIENT DATA --------
  const patient = consultation?.patient || {
    patientId: "N/A",
    date: new Date().toISOString().slice(0, 10),
    doctor: "Dr. Sachin Roundal"
  };

  // -------- MEDICINES --------
  const [medicines, setMedicines] = useState(
    consultation?.prescription?.map(m => ({
      ...m,
      price: 50
    })) || []
  );

  // -------- CHARGES --------
  const [charges, setCharges] = useState({
    consultationFee: 400,
    labTests: 250,
    serviceFee: 50
  });

  // -------- PAYMENT MODE --------
  const [paymentMode, setPaymentMode] = useState("CASH");

  // -------- UPDATE MEDICINE PRICE --------
  const updateMedicinePrice = (index, price) => {
    const updated = [...medicines];
    updated[index].price = Number(price);
    setMedicines(updated);
  };

  // -------- UPDATE CHARGES --------
  const updateCharge = (field, value) => {
    setCharges({ ...charges, [field]: Number(value) });
  };

  // -------- TOTALS --------
  const medicineTotal = medicines.reduce((sum, m) => sum + (m.price || 0), 0);

  const grandTotal =
    medicineTotal +
    charges.consultationFee +
    charges.labTests +
    charges.serviceFee;

  // -------- SEND BILL --------
  const sendBill = async () => {

  const billPayload = {
    appointmentId: consultation.patient.appointmentId,
    patientId: patient.patientId,
    doctorId: patient.doctorId,

    consultationFee: charges.consultationFee,
    labFee: charges.labTests,
    serviceFee: charges.serviceFee,

    medicineTotal: medicineTotal,
    grandTotal: grandTotal,

    paymentMode: paymentMode
  };

  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("http://localhost:8082/bills", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(billPayload)
    });

    // 🔥 DUPLICATE BILL HANDLING (ADD THIS)
    if (!res.ok) {
      const msg = await res.text();

      if (msg.includes("already generated")) {
        alert("Bill is already generated for this appointment");
        return;
      }

      alert(msg || "Failed to send bill");
      return;
    }

    alert("Bill Sent Successfully");

  } catch (err) {
    alert("Failed to send bill");
  }
};



  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="bill-wrapper container">

          <div className="bill-card">

            {/* HEADER */}
            <div className="bill-header">
              <h3>MediSync Clinic</h3>
              <p>Doctor Bill & Invoice</p>
            </div>

            {/* PATIENT DETAILS */}
            <div className="bill-section">
              <p><b>Patient ID:</b> {patient.patientId || "N/A"}</p>
              <p><b>Date:</b> {patient.date}</p>
              <p><b>Doctor:</b> {patient.doctor}</p>
            </div>

            {/* MEDICINE TABLE */}
            <div className="bill-section">
              <h5>Prescribed Medicines</h5>

              {medicines.length === 0 ? (
                <p className="text-muted mt-2">No medicines prescribed</p>
              ) : (
                <table className="table table-bordered mt-2">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Price (₹)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {medicines.map((m, i) => (
                      <tr key={i}>
                        <td>{m.name}</td>
                        <td>{m.dosage}</td>
                        <td>{m.duration}</td>
                        <td style={{ width: "120px" }}>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={m.price}
                            onChange={(e) =>
                              updateMedicinePrice(i, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* CHARGES */}
            <div className="bill-section">
              <h5>Charges Breakdown</h5>

              <table className="table table-sm">
                <tbody>

                  <tr>
                    <td>Consultation Fee</td>
                    <td className="text-end">
                      <input
                        type="number"
                        className="form-control form-control-sm text-end"
                        value={charges.consultationFee}
                        onChange={(e) =>
                          updateCharge("consultationFee", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Lab Tests</td>
                    <td className="text-end">
                      <input
                        type="number"
                        className="form-control form-control-sm text-end"
                        value={charges.labTests}
                        onChange={(e) =>
                          updateCharge("labTests", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Service Fee</td>
                    <td className="text-end">
                      <input
                        type="number"
                        className="form-control form-control-sm text-end"
                        value={charges.serviceFee}
                        onChange={(e) =>
                          updateCharge("serviceFee", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr className="fw-bold">
                    <td>Total Medicine Cost</td>
                    <td className="text-end">₹{medicineTotal}</td>
                  </tr>

                  <tr className="fw-bold fs-5 text-success">
                    <td>Grand Total</td>
                    <td className="text-end">₹{grandTotal}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* PAYMENT MODE */}
            <div className="bill-section">
              <h5>Payment Mode</h5>

              <select
                className="form-select w-50"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
              </select>

              <p className="text-muted mt-2 mb-0">
                {paymentMode === "UPI"
                  ? "UPI payment request will be sent to the patient"
                  : "Patient will pay directly in cash"}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="bill-actions d-flex gap-2">
              <button className="btn btn-primary" onClick={() => window.print()}>
                Print Bill
              </button>

              <button className="btn btn-success" onClick={sendBill}>
                Send Bill
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorBill;
