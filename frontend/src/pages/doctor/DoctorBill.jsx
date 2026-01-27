import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-bill.css";

function DoctorBill() {
  const location = useLocation();
  const consultation = location.state?.consultation;

  // -------- PATIENT DATA --------
  const patient = consultation?.patient || {
    name: "John Doe",
    id: "PAT201",
    date: "2026-01-25",
    doctor: "Dr. Sachin Roundal"
  };

  // -------- MEDICINES --------
  const [medicines, setMedicines] = useState(
    consultation?.prescription || [
      { name: "Paracetamol", dosage: "500mg", duration: "5 Days", price: 50 },
      { name: "Amoxicillin", dosage: "250mg", duration: "7 Days", price: 120 }
    ]
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

const sendBill = () => {
  const billPayload = {
    patientId: patient.id,
    patientName: patient.name,
    medicines,
    charges,
    medicineTotal,
    grandTotal,
    paymentMode,
    date: new Date().toISOString()
  };

  console.log("Bill Payload:", billPayload);

  if (paymentMode === "CASH") {
    alert("Bill sent to patient. Payment mode: Cash");
  } else {
    alert("Bill sent. UPI payment request sent to patient.");
  }

  // Future backend API:
  /*
  axios.post("/api/billing/send", billPayload);
  */
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
              <p><b>Patient Name:</b> {patient.name}</p>
              <p><b>Patient ID:</b> {patient.id}</p>
              <p><b>Date:</b> {patient.date}</p>
              <p><b>Doctor:</b> {patient.doctor}</p>
            </div>

            {/* MEDICINE TABLE */}
            <div className="bill-section">
              <h5>Prescribed Medicines</h5>

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

  {/* MODE INFO */}
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
