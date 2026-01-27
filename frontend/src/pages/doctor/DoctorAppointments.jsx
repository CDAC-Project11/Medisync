import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-appointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      status: "COMPLETED"
    },
    {
      id: 203,
      patientName: "Sneha Patil",
      date: "2026-01-26",
      time: "04:00 PM",
      reason: "Blood Pressure",
      status: "PENDING"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAppointments(staticAppointments);
      setLoading(false);
    }, 500);
  }, []);

  // -------- OPEN CONSULTATION PAGE --------
  const openPatientConsultation = (appointment) => {
    navigate("/doctor/patient-consultation", {
      state: { appointment }
    });
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

                      {/* STATUS ONLY PENDING / COMPLETED */}
                      <td>
                        <span
                          className={`badge ${
                            a.status === "COMPLETED"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>

                      {/* ACTION: ONLY OPEN PATIENT */}
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openPatientConsultation(a)}
                        >
                          Open Patient
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

export default DoctorAppointments;
