import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/patient/dashboard.css";
import "../../styles/common/background.css";
import bgImage from "../../assets/images/doctor.jpeg";

import { getMyProfile } from "../../utils/patientApi";

// Card images
import bookAppointmentImg from "../../assets/images/book-appointment.jpeg";
import medicalRecordsImg from "../../assets/images/medical-records.jpeg";
import healthSectionImg from "../../assets/images/health-section.jpeg";
import chatSectionImg from "../../assets/images/chat-section.jpeg";
import paymentHistoryImg from "../../assets/images/payment-history.jpg";
import paymentGatewayImg from "../../assets/images/payment-gateway.jpeg";

function Dashboard() {
  const [patientName, setPatientName] = useState("");
  const navigate = useNavigate();

  // 🔐 AUTH CHECK + PROFILE LOAD (unchanged logic)
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setPatientName(data.name || data.fullName);
      } catch (err) {
        sessionStorage.clear();
        navigate("/", { replace: true });
      }
    };

    loadProfile();
  }, [navigate]);

  // 🚫 DISABLE BACK NAVIGATION ON DASHBOARD (NEW – REQUIRED)
  useEffect(() => {
    // Add a dummy history entry
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Force stay on dashboard
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div
      className="common-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="common-content">
        <Navbar />

        <h2 className="page-title">
          Welcome{patientName && `, ${patientName}`} 👋
        </h2>

        <p id="subtitle" className="subtitle">
          Your smart health companion — fast, simple, and secure
        </p>

        <div className="container mt-3 page-bottom-space">
          <div className="row g-4 justify-content-center">

            <DashboardCard
              title="Book Appointment"
              text="Schedule your visit with ease."
              img={bookAppointmentImg}
              link="/appointment"
            />

            <DashboardCard
              title="Medical Records"
              text="Your reports & prescriptions in one place."
              img={medicalRecordsImg}
              link="/patient/medical-records"
            />

            <DashboardCard
              title="Health Section"
              text="Wellness tips, BMI tracking & more."
              img={healthSectionImg}
              link="/health"
            />

            <DashboardCard
              title="Chat Section"
              text="Instant messaging with the clinic."
              img={chatSectionImg}
              link="/chat"
            />

            <DashboardCard
              title="Payment History"
              text="Track all past payments easily."
              img={paymentHistoryImg}
              link="/payments"
            />

            <DashboardCard
              title="Payment Gateway"
              text="Secure online clinic payments."
              img={paymentGatewayImg}
              link="/payment"
            />

          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function DashboardCard({ title, text, img, link }) {
  return (
    <div className="col-sm-6 col-lg-4">
      <Link to={link} className="link-clean">
        <div className="feature-card h-100">
          <img src={img} className="feature-img" alt={title} />
          <div className="content-box">
            <div className="feature-title">{title}</div>
            <div className="feature-text">{text}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
