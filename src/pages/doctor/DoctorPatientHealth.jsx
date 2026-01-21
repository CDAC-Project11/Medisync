import { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-patient-health.css";

function DoctorPatientHealth() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  // -------- STATIC PATIENT DATA --------
  const patientData = [
    { id: "P101", name: "John Doe", heightCm: 170, weightKg: 68 },
    { id: "P102", name: "Amit Sharma", heightCm: 165, weightKg: 82 },
    { id: "P103", name: "Sneha Patil", heightCm: 158, weightKg: 50 }
  ];

  // -------- SEARCH BY PATIENT ID --------
  const handleSearch = () => {
    const found = patientData.find(
      (p) => p.id.toLowerCase() === patientId.toLowerCase()
    );

    if (!found) {
      setPatient(null);
      setError("Patient not found");
      return;
    }

    setError("");
    setPatient(found);
  };

  // -------- BMI CALCULATION --------
  const calculateBMI = (h, w) => {
    const bmi = Number((w / Math.pow(h / 100, 2)).toFixed(1));

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return { bmi, category };
  };

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="doctor-health-wrapper">

          <h1>Patient Health Overview</h1>
          <p className="text-secondary text-center">
            Search patient by ID to view BMI & health status
          </p>

          {/* SEARCH */}
          <div className="row mt-3">
            <div className="col-md-4 ms-auto d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient ID (e.g. P101)"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-danger text-center mt-3">{error}</p>
          )}

          {/* RESULT */}
          {patient && (() => {
            const { bmi, category } = calculateBMI(
              patient.heightCm,
              patient.weightKg
            );

            return (
              <div className="health-card mt-4">

                <h4 className="text-center fw-bold mb-3">
                  Patient Health Details
                </h4>

                <p><b>Patient ID:</b> {patient.id}</p>
                <p><b>Name:</b> {patient.name}</p>
                <p><b>Height:</b> {patient.heightCm} cm</p>
                <p><b>Weight:</b> {patient.weightKg} kg</p>

                <div className="bmi-box">
                  <h3>BMI: {bmi}</h3>
                  <span
                    className={`badge ${
                      category === "Normal"
                        ? "bg-success"
                        : category === "Underweight"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {category}
                  </span>
                </div>

              </div>
            );
          })()}

        </div>
      </div>
    </>
  );
}

export default DoctorPatientHealth;
