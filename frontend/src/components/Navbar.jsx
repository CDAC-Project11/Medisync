import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-medisync.jpg";
import "../styles/common/navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("NAVBAR RENDER → path:", location.pathname, "token:", sessionStorage.getItem("token"));


  // 🔐 AUTH STATE
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;
  let user = null;
try {
  const storedUser = sessionStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  user = null;
}


  // 🔁 ROLE: backend first, URL fallback
  const role = user?.role === "DOCTOR" ? "DOCTOR" : "PATIENT";

  // 🔽 SCROLL LOGIC (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm navbar-fixed ${
        showNavbar ? "navbar-show" : "navbar-hide"
      }`}
    >
      <div className="container-fluid">

        {/* LOGO */}
       <Link className="navbar-brand d-flex align-items-center" to="/">


          <img
            src={logo}
            alt="MediSync Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <span className="fw-bold fs-4" style={{ color: "#04569d" }}>
            MediSync
          </span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.includes("doctor") ? "fw-bold" : ""
                  }`}
                  to={role === "DOCTOR" ? "/doctor/dashboard" : "/dashboard"}
                >
                  Home
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedback">Feedback</Link>
            </li>

          </ul>

          {/* RIGHT MENU */}
          <ul className="navbar-nav ms-auto align-items-center">

            {/* 🔔 NOTIFICATIONS (only if logged in) */}
            {isLoggedIn && (
              <li className="nav-item me-3">
                <Link
                  className="nav-link position-relative"
                  to={role === "DOCTOR" ? "/doctor/notifications" : "/notifications"}
                >
                  <i className="bi bi-bell" style={{ fontSize: "1.3rem" }}></i>

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {role === "DOCTOR" ? 5 : 2}
                  </span>
                </Link>
              </li>
            )}

            {/* ROLE BADGE */}
            {isLoggedIn && (
              <li className="nav-item me-2">
                <span className="badge bg-light text-primary">
                  {role === "DOCTOR" ? "Doctor" : "Patient"}
                </span>
              </li>
            )}

            {/* AUTH ACTIONS */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
