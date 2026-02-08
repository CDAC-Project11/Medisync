import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
    getAllRecords,
    searchRecords,
    filterByDate
} from "../../services/medicalRecordService";
import "../../styles/patient/medical-records.css";

function MedicalRecords() {

    const [records, setRecords] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);

    // ---------- LOAD ALL RECORDS ----------
    useEffect(() => {
        fetchAllRecords();
    }, []);

    const fetchAllRecords = async () => {
        try {
            const response = await getAllRecords();

            // axios returns { data: [...] }
            setRecords(Array.isArray(response.data) ? response.data : []);

        } catch (error) {
            console.error("Error loading records", error);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    // ---------- SEARCH ----------
    const handleSearch = async () => {
        if (!searchText) {
            return fetchAllRecords();
        }

        try {
            const response = await searchRecords(searchText);
            setRecords(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    // ---------- DATE FILTER ----------
    const handleDateChange = async (date) => {
        setSelectedDate(date);

        if (!date) {
            return fetchAllRecords();
        }

        try {
            const response = await filterByDate(date);
            setRecords(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Date filter failed", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="records-wrapper container-fluid">

                    <h1>Medical Records</h1>
                    <p className="text-secondary">
                        Secure and centralized patient medical history
                    </p>

                    {/* SEARCH */}
                    <div className="card p-3 shadow-sm mt-3">
                        <div className="row g-2">
                            <div className="col-md-10 col-sm-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Patient Name / ID"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2 col-sm-12 d-grid">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DATE FILTER */}
                    <div className="row mt-3">
                        <div className="col-md-4 ms-auto">
                            <input
                                type="date"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered record-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Symptoms</th>
                                    <th>Diagnosis</th>
                                    <th>Prescription</th>
                                    <th>Date</th>
                                    <th>Report</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Loading records...
                                        </td>
                                    </tr>

                                ) : !records || records.length === 0 ? (

                                    <tr>
                                        <td colSpan="7" className="text-center text-danger">
                                            No records found
                                        </td>
                                    </tr>

                                ) : (

                                    records.map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.id}</td>

                                            <td>{r.patientName || `Patient #${r.patient_id}`}</td>

                                            <td>{r.symptoms}</td>

                                            <td>{r.diagnosis}</td>

                                            <td>
                                                {r.prescription || "—"}
                                            </td>

                                            <td>
                                                {r.date
                                                    ? new Date(r.date).toLocaleDateString()
                                                    : ""}
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

export default MedicalRecords;
