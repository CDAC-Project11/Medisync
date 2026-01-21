import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-clinic-analysis.css";

function DoctorClinicAnalysis() {
  // -------- STATIC ANALYTICS DATA --------
  const analytics = {
    totalRevenue: 245000,
    monthlyRevenue: 42000,
    totalPatients: 1280,
    todayPatients: 42,

    commonDiseases: [
      { name: "Fever / Viral", count: 420 },
      { name: "Diabetes", count: 310 },
      { name: "Blood Pressure", count: 280 },
      { name: "Respiratory Issues", count: 190 },
      { name: "Orthopedic Pain", count: 160 }
    ],

    monthlyPatients: [
      { month: "Jan", count: 120 },
      { month: "Feb", count: 140 },
      { month: "Mar", count: 180 },
      { month: "Apr", count: 210 },
      { month: "May", count: 260 },
      { month: "Jun", count: 370 }
    ]
  };

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="analysis-wrapper">

          <h1>Clinic Analysis Dashboard</h1>
          <p className="text-secondary text-center">
            Overall performance and patient insights
          </p>

          {/* ===== SUMMARY CARDS ===== */}
          <div className="row mt-4 g-3">

            <div className="col-md-3">
              <div className="stat-card revenue">
                <h6>Total Revenue</h6>
                <h3>₹ {analytics.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card income">
                <h6>This Month</h6>
                <h3>₹ {analytics.monthlyRevenue.toLocaleString()}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card patients">
                <h6>Total Patients</h6>
                <h3>{analytics.totalPatients}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card today">
                <h6>Today Visits</h6>
                <h3>{analytics.todayPatients}</h3>
              </div>
            </div>

          </div>

          {/* ===== DISEASE ANALYSIS ===== */}
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="analysis-card">
                <h5>Most Common Diseases</h5>

                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Disease</th>
                      <th>Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.commonDiseases.map((d, i) => (
                      <tr key={i}>
                        <td>{d.name}</td>
                        <td>{d.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>

            {/* ===== PATIENT TREND ===== */}
            <div className="col-md-6">
              <div className="analysis-card">
                <h5>Monthly Patient Visits</h5>

                <ul className="trend-list mt-3">
                  {analytics.monthlyPatients.map((m, i) => (
                    <li key={i}>
                      <span>{m.month}</span>
                      <span>{m.count} patients</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default DoctorClinicAnalysis;
