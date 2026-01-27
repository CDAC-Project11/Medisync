import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-consultation.css";

function DoctorPatientConsultation() {
    const location = useLocation();
    const navigate = useNavigate();
    const appointment = location.state?.appointment;

    // STATUS STATE
    const [status, setStatus] = useState(appointment?.status || "PENDING");

    const [vitals, setVitals] = useState({
        height: "",
        weight: "",
        bp: "",
        sugar: ""
    });

    const [bmi, setBmi] = useState(null);
    const [bmiText, setBmiText] = useState("");

    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState([]);

    const [newMedicine, setNewMedicine] = useState({
        name: "",
        dosage: "",
        duration: "",
        timing: ""
    });

    // -------- STATIC RECORDS --------
    const medicalRecords = [
        {
            date: "2025-12-10",
            symptoms: "Fever",
            diagnosis: "Viral Infection",
            prescription: "Paracetamol"
        },
        {
            date: "2025-11-01",
            symptoms: "BP Issue",
            diagnosis: "Hypertension",
            prescription: "Amlodipine"
        }
    ];

    // -------- BMI AUTO --------
    useEffect(() => {
        if (vitals.height && vitals.weight) {
            const bmiValue = (
                vitals.weight /
                Math.pow(vitals.height / 100, 2)
            ).toFixed(1);

            setBmi(bmiValue);

            if (bmiValue < 18.5) setBmiText("Underweight");
            else if (bmiValue < 25) setBmiText("Normal");
            else if (bmiValue < 30) setBmiText("Overweight");
            else setBmiText("Obese");
        }
    }, [vitals.height, vitals.weight]);

    const handleVitalsChange = (e) => {
        setVitals({ ...vitals, [e.target.name]: e.target.value });
    };

    // -------- ADD MEDICINE --------
    const addMedicine = () => {
        if (!newMedicine.name || !newMedicine.timing) return;

        setPrescription([...prescription, newMedicine]);

        setNewMedicine({
            name: "",
            dosage: "",
            duration: "",
            timing: ""
        });
    };

    // -------- MARK AS DONE --------
    const markAsDone = () => {
        setStatus("COMPLETED");
        alert("Consultation marked as completed");

        // Backend future:
        // axios.put(`/api/appointments/${appointment.id}/status`, { status: "COMPLETED" });
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="consult-layout container-fluid">
                    <div className="row g-3">

                        {/* ================= LEFT PANEL ================= */}
                        <div className="col-lg-4">

                            {/* PATIENT INFO */}
                            <div className="card consult-box mb-3">
                                <h5>Patient Details</h5>
                                <p><b>Name:</b> {appointment?.patientName}</p>
                                <p><b>Date:</b> {appointment?.date}</p>
                                <p><b>Reason:</b> {appointment?.reason}</p>

                                <span className={`badge mt-2 ${status === "COMPLETED" ? "bg-success" : "bg-warning"}`}>
                                    {status}
                                </span>
                            </div>

                            {/* MEDICAL RECORDS */}
                            <div className="card consult-box mb-3">
                                <h5>Medical Records</h5>

                                <table className="table table-sm mt-2">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Symptoms</th>
                                            <th>Diagnosis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicalRecords.map((r, i) => (
                                            <tr key={i}>
                                                <td>{r.date}</td>
                                                <td>{r.symptoms}</td>
                                                <td>{r.diagnosis}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* HEALTH SECTION */}
                            <div className="card consult-box">
                                <h5>Health Overview</h5>
                                <p><b>Last BMI:</b> 23.5 (Normal)</p>
                                <p><b>Blood Pressure:</b> 120 / 80</p>
                                <p><b>Sugar:</b> 98 mg/dL</p>
                            </div>

                        </div>

                        {/* ================= RIGHT PANEL ================= */}
                        <div className="col-lg-8">

                            {/* VITALS */}
                            <div className="card consult-box mb-3">
                                <h5>Enter Vitals</h5>

                                <div className="row g-2">
                                    {["height", "weight", "bp", "sugar"].map((field) => (
                                        <div className="col-md-3" key={field}>
                                            <input
                                                name={field}
                                                className="form-control"
                                                placeholder={field.toUpperCase()}
                                                onChange={handleVitalsChange}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {bmi && (
                                    <div className="mt-2 fw-semibold">
                                        BMI: {bmi} ({bmiText})
                                    </div>
                                )}
                            </div>

                            {/* DIAGNOSIS */}
                            <div className="card consult-box mb-3">
                                <h5>Diagnosis</h5>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                            </div>

                            {/* PRESCRIPTION INPUT */}
                            <div className="card consult-box mb-3">
                                <h5>Prescription</h5>

                                <div className="row g-2 mb-2">
                                    <div className="col-md-3">
                                        <input
                                            className="form-control"
                                            placeholder="Medicine"
                                            value={newMedicine.name}
                                            onChange={(e) =>
                                                setNewMedicine({ ...newMedicine, name: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <input
                                            className="form-control"
                                            placeholder="Dosage"
                                            value={newMedicine.dosage}
                                            onChange={(e) =>
                                                setNewMedicine({ ...newMedicine, dosage: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <input
                                            className="form-control"
                                            placeholder="Duration"
                                            value={newMedicine.duration}
                                            onChange={(e) =>
                                                setNewMedicine({ ...newMedicine, duration: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <select
                                            className="form-select"
                                            value={newMedicine.timing}
                                            onChange={(e) =>
                                                setNewMedicine({ ...newMedicine, timing: e.target.value })
                                            }
                                        >
                                            <option value="">Timing</option>
                                            <option value="Before Eating">Before Eating</option>
                                            <option value="After Eating">After Eating</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="btn btn-outline-primary mb-2" onClick={addMedicine}>
                                    Add Medicine
                                </button>

                                {/* PRESCRIPTION TABLE */}
                                {prescription.length > 0 && (
                                    <table className="table table-sm mt-2">
                                        <thead>
                                            <tr>
                                                <th>Medicine</th>
                                                <th>Dosage</th>
                                                <th>Duration</th>
                                                <th>Timing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescription.map((m, i) => (
                                                <tr key={i}>
                                                    <td>{m.name}</td>
                                                    <td>{m.dosage}</td>
                                                    <td>{m.duration}</td>
                                                    <td>{m.timing}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="d-flex justify-content-end gap-2 mb-4 flex-wrap">

                                <button
                                    className="btn btn-success action-btn"
                                    onClick={markAsDone}
                                    disabled={status === "COMPLETED"}
                                >
                                    {status === "COMPLETED" ? "✔ Completed" : "Mark as Done"}
                                </button>

                                <button
                                    className="btn btn-info text-white action-btn"
                                    onClick={() => alert("Medical report sent to patient (static)")}
                                >
                                    Send Report
                                </button>

                                <button
                                    className="btn btn-outline-secondary action-btn"
                                    onClick={() => window.print()}
                                >
                                    Print Report
                                </button>

                                <button
                                    className="btn btn-primary action-btn"
                                    onClick={() =>
                                        navigate("/doctor/generate-bill", {
                                            state: {
                                                consultation: {
                                                    patient: appointment,
                                                    prescription,
                                                    vitals,
                                                    diagnosis
                                                }
                                            }
                                        })
                                    }
                                >
                                    Generate Bill
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorPatientConsultation;
