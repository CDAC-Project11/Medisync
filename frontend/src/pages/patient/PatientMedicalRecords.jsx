import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/medical-records.css";

function PatientMedicalRecords() {

    // TEMP: Replace later with API
    const patientName = "John Doe";

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        try {
            // 🔁 Replace later with backend API
            const dummyData = [
                {
                    id: 1,
                    date: "2024-03-10",
                    symptoms: "Fever, cough",
                    diagnosis: "Viral Infection",
                    prescription: [
                        {
                            name: "Paracetamol",
                            dosage: "500mg",
                            duration: "5 Days",
                            timing: "After Eating"
                        }
                    ],
                    report: "Blood Test"
                },
                {
                    id: 2,
                    date: "2024-02-20",
                    symptoms: "Migraine",
                    diagnosis: "Headache Disorder",
                    prescription: [
                        {
                            name: "Pain Relief Tablet",
                            dosage: "250mg",
                            duration: "3 Days",
                            timing: "Before Eating"
                        },
                        {
                            name: "Vitamin B Complex",
                            dosage: "1 Tablet",
                            duration: "10 Days",
                            timing: "After Eating"
                        }
                    ],
                    report: "MRI Scan"
                }
            ];

            setRecords(dummyData);
        } catch (error) {
            console.error("Error loading records");
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
                                ) : records.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-danger">
                                            No medical records found
                                        </td>
                                    </tr>
                                ) : (
                                    records.map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.date}</td>
                                            <td>{r.symptoms}</td>
                                            <td>{r.diagnosis}</td>

                                            {/* PRESCRIPTION COLUMN */}
                                            <td>
                                                {r.prescription.length > 0 ? (
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
