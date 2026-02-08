import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/images/doctor.jpeg";
import "../../styles/common/background.css";
import "../../styles/auth/login.css";
import api from "../../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  setMsg("");
  setMsgType("");

  if (!email || !password) {
    setMsg("Email and password are required");
    setMsgType("danger");
    return;
  }

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, role } = res.data;

    if (!token || !role) {
      throw new Error("Invalid login response");
    }

    // ✅ BUILD USER OBJECT (since backend sends role directly)
    const user = {
      email,
      role,
    };

    // 🔐 STORE AUTH DATA
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));

    setMsg("Login successful! Redirecting...");
    setMsgType("success");

    // 🔁 ROLE-BASED REDIRECT
    // setTimeout(() => {
    //   if (role === "DOCTOR") {
    //     navigate("/doctor/dashboard");
    //   } else {
    //     navigate("/dashboard");
    //   }
    // }, 800);
    console.log(role);
    if (role === "DOCTOR") {
        navigate("/doctor/DoctorDashboard");
      } else {
        navigate("/dashboard");
      }


  } catch (err) {
    setMsg(
      err.response?.data?.message ||
      err.message ||
      "Invalid credentials"
    );
    setMsgType("danger");
  }
};



  return (
    <div
      className="common-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="common-content">
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="row w-100 justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow-lg border-0 login-card">
                <div className="card-body p-4">

                  <h3 className="text-center mb-3">Login</h3>
                  <p className="text-center text-muted mb-3">
                    Sign in to your MediSync account
                  </p>

                  {msg && (
                    <p className={`text-center fw-semibold text-${msgType}`}>
                      {msg}
                    </p>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button className="btn btn-primary" onClick={handleLogin}>
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-muted small">
                      Don’t have an account?{" "}
                      <Link to="/register" className="fw-semibold">
                        Register
                      </Link>
                    </span>
                  </div>

                </div>
              </div>

              <p className="text-center text-light small mt-3 mb-0">
                © 2026 MediSync Smart Clinic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
