import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-appointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      // 1️⃣ Fetch appointments
      const res = await fetch(
        "http://localhost:8082/appointments/doctor/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const appointmentData = await res.json();

      // 2️⃣ Fetch patient basic info
      const enriched = await Promise.all(
        appointmentData.map(async (a) => {
          let patientName = "Unknown";

          try {
            const pRes = await fetch(
              `http://localhost:8081/patients/${a.patientId}/basic`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            if (pRes.ok) {
              const patient = await pRes.json();
              patientName = patient.name;
            }
          } catch (e) {
            console.error("Patient fetch failed", e);
          }

          return {
  appointmentId: a.id,        // ✅ REAL appointment ID
  patientId: a.patientId,     // ✅ patient ID
  patientName,
  date: a.appointmentDate,
  time: a.appointmentTime,
  reason: a.reason,
  status: a.status
};

        })
      );

      setAppointments(enriched);

    } catch (err) {
      console.error(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const openPatientConsultation = (appointment) => {
    console.log(appointment);

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
                  <th>Patient ID</th>
                  <th>Patient Name</th>
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
                  appointments.map((a, i) => (
                    <tr key={i}>
                      <td>{a.patientId}</td>
                      <td>{a.patientName}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                      <td>{a.reason}</td>
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
