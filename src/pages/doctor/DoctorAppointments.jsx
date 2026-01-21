import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-appointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------- STATIC DATA (TEMPORARY) --------
  const staticAppointments = [
    {
      id: 201,
      patientName: "John Doe",
      date: "2026-01-25",
      time: "10:30 AM",
      reason: "General Checkup",
      status: "PENDING"
    },
    {
      id: 202,
      patientName: "Amit Sharma",
      date: "2026-01-25",
      time: "12:00 PM",
      reason: "Fever & Cold",
      status: "APPROVED"
    },
    {
      id: 203,
      patientName: "Sneha Patil",
      date: "2026-01-26",
      time: "04:00 PM",
      reason: "Blood Pressure",
      status: "COMPLETED"
    }
  ];

  useEffect(() => {
    // simulate API delay
    setTimeout(() => {
      setAppointments(staticAppointments);
      setLoading(false);
    }, 500);
  }, []);

  // -------- STATUS UPDATE (STATIC) --------
  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
  };

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="doctor-wrapper">

          <h1>Appointment Scheduling</h1>
          <p className="text-secondary text-center">
            Manage and schedule patient appointments
          </p>

          <div className="table-responsive mt-4">
            <table className="table table-bordered doctor-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
  {loading ? (
    <tr>
      <td colSpan="7" className="text-center">
        Loading appointments...
      </td>
    </tr>
  ) : appointments.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center text-danger">
        No appointments found
      </td>
    </tr>
  ) : (
    appointments.map((a) => (
      <tr key={a.id}>
        <td>{a.id}</td>
        <td>{a.patientName}</td>
        <td>{a.date}</td>
        <td>{a.time}</td>
        <td>{a.reason}</td>
        <td>
          <span
            className={`badge ${
              a.status === "APPROVED"
                ? "bg-success"
                : a.status === "COMPLETED"
                ? "bg-primary"
                : "bg-warning"
            }`}
          >
            {a.status}
          </span>
        </td>
        <td>
          {a.status === "PENDING" && (
            <>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => updateStatus(a.id, "APPROVED")}
              >
                Approve
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => updateStatus(a.id, "REJECTED")}
              >
                Reject
              </button>
            </>
          )}

          {a.status === "APPROVED" && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => updateStatus(a.id, "COMPLETED")}
            >
              Mark Completed
            </button>
          )}

          {a.status === "COMPLETED" && (
            <span className="text-success fw-bold">✔ Done</span>
          )}
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

export default DoctorAppointments;
