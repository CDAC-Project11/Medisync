import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-medisync.jpg";
import "../styles/common/navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard"  >
              Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">Feedback</Link>
            </li>
          </ul>

          {/* RIGHT MENU */}
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Notifications */}
            <li className="nav-item me-3">
              <Link className="nav-link position-relative" to="/notifications">
                <i className="bi bi-bell" style={{ fontSize: "1.3rem" }}></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  3
                </span>
              </Link>
            </li>

            {/* LOGIN */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>

            {/* REGISTER (RESTORED ✅) */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
