import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-dashboard.css";

import { getUserFromToken } from "../../utils/auth";


function DoctorDashboard() {
    console.log("DoctorDashboard MOUNTED");

    const navigate = useNavigate();

    //error
     const user = getUserFromToken();

    // 🔐 AUTH CHECK (NEW – REQUIRED)
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");

        // if (!token || role !== "ADMIN") {
        //     localStorage.clear();
        //     navigate("/", { replace: true });
        // }
// error
         if (!user || user.role !== "DOCTOR") {
      sessionStorage.clear();
      navigate("/", { replace: true });
      return;
    }


    }, [navigate]);

    // 🚫 DISABLE BACK NAVIGATION (NEW – REQUIRED)
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            navigate("/doctor/DoctorDashboard", { replace: true });
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [navigate]);

    // 🌊 Parallax effect (UNCHANGED)
    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.pageYOffset;
            const bg = document.querySelector(".bg-parallax");
            const overlay = document.querySelector(".bg-overlay");
            if (bg && overlay) {
                bg.style.transform = `translateY(-${scrolled * 0.2}px)`;
                overlay.style.transform = `translateY(-${scrolled * 0.2}px)`;
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* BACKGROUND */}
            <div className="bg-parallax"></div>
            <div className="bg-overlay"></div>

            <Navbar />

            <div className="page-content">
                <h2 className="page-title">Doctor Dashboard</h2>

                <div className="container mt-4">
                    <div className="row g-4">

                        {/* Appointments */}
                        <div className="col-md-6 col-lg-3">
                            <Link to="/doctor/appointments" className="link-clean">
                                <div className="dash-card">
                                    <i className="bi bi-calendar-check dash-icon"></i>
                                    <div className="dash-title">Appointments</div>
                                    <p className="dash-desc">
                                        View and manage upcoming appointments.
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Medical Records */}
                        <div className="col-md-6 col-lg-3">
                            <Link to="/medical-records" className="link-clean">
                                <div className="dash-card">
                                    <i className="bi bi-file-medical dash-icon"></i>
                                    <div className="dash-title">Medical Records</div>
                                    <p className="dash-desc">
                                        Access patient health records & history.
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Chat */}
                        <div className="col-md-6 col-lg-3">
                            <Link to="/doctor/chat" className="link-clean">
                                <div className="dash-card">
                                    <i className="bi bi-chat-dots dash-icon"></i>
                                    <div className="dash-title">Chat</div>
                                    <p className="dash-desc">
                                        Communicate securely with patients.
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Payments */}
                        <div className="col-md-6 col-lg-3">
                            <Link to="/doctor/payments" className="link-clean">
                                <div className="dash-card">
                                    <i className="bi bi-wallet2 dash-icon"></i>
                                    <div className="dash-title">Payments</div>
                                    <p className="dash-desc">
                                        View payment status & transactions.
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className="row g-4 justify-content-center mt-1">
                            {/* Patient Health */}
                            <div className="col-md-6 col-lg-3">
                                <Link to="/doctor/patient-health" className="link-clean">
                                    <div className="dash-card">
                                        <i className="bi bi-heart-pulse dash-icon"></i>
                                        <div className="dash-title">Patient Health</div>
                                        <p className="dash-desc">
                                            View BMI & health status of patients.
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Clinic Analytics */}
                            <div className="col-md-6 col-lg-3">
                                <Link to="/doctor/analysis" className="link-clean">
                                    <div className="dash-card">
                                        <i className="bi bi-graph-up-arrow dash-icon"></i>
                                        <div className="dash-title">Analytics</div>
                                        <p className="dash-desc">
                                            Clinic performance & insights.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDashboard;
