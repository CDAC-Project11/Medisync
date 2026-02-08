import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/medical-records.css";

function PatientMedicalRecords() {

    const [patientName, setPatientName] = useState("Loading...");
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatientAndRecords();
    }, []);

    const loadPatientAndRecords = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                alert("Session expired. Please login again.");
                return;
            }

            // ✅ Get patient profile (User Service – 8080)
            const patientResponse = await fetch("http://localhost:8080/patients/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const patientData = await patientResponse.json();
            setPatientName(patientData.fullName || "Patient");

            // ✅ Get medical records (Node Service – 8084)
            const recordResponse = await fetch("http://localhost:8084/medical-records/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (recordResponse.ok) {
                const recordData = await recordResponse.json();

                // Ensure array
                setRecords(Array.isArray(recordData) ? recordData : []);
            } else {
                setRecords([]);
            }

        } catch (error) {
            console.error("Error loading records", error);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="records-wrapper container-fluid">

                    <h1>My Medical Records</h1>

                    <p className="text-secondary text-center">
                        Patient: <strong>{patientName}</strong>
                    </p>

                    {/* TABLE */}
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered record-table">

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Symptoms</th>
                                    <th>Diagnosis</th>
                                    <th>Prescription</th>
                                    <th>Report</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            Loading records...
                                        </td>
                                    </tr>

                                ) : !records || records.length === 0 ? (

                                    <tr>
                                        <td colSpan="5" className="text-center text-danger">
                                            No medical records found
                                        </td>
                                    </tr>

                                ) : (

                                    records.map((r) => (
                                        <tr key={r.id}>

                                            <td>
                                                {r.date
                                                    ? new Date(r.date).toLocaleDateString()
                                                    : ""}
                                            </td>

                                            <td>{r.symptoms}</td>

                                            <td>{r.diagnosis}</td>

                                            {/* PRESCRIPTION COLUMN */}
                                            <td>
                                                {Array.isArray(r.prescription) && r.prescription.length > 0 ? (

                                                    <ul className="prescription-list">
                                                        {r.prescription.map((m, i) => (
                                                            <li key={i}>
                                                                <b>{m.name}</b> — {m.dosage}, {m.duration}
                                                                <span className="timing-badge">
                                                                    {m.timing}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                ) : (
                                                    <span className="text-muted">No medicines</span>
                                                )}
                                            </td>

                                            <td>
                                                <button className="btn btn-sm btn-outline-info">
                                                    View
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

export default PatientMedicalRecords;
