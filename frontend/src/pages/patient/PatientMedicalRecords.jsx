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
                    prescription: "Paracetamol, Rest",
                    report: "Blood Test"
                },
                {
                    id: 2,
                    date: "2024-02-20",
                    symptoms: "Headache",
                    diagnosis: "Migraine",
                    prescription: "Pain Relief Medication",
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
                                            <td>{r.prescription}</td>
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
