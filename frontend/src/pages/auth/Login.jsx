import { useState } from "react";
import bgImage from "../../assets/images/doctor.jpeg";
import "../../styles/common/background.css";
import "../../styles/auth/login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");

    const handleLogin = () => {
        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            setMsg("Invalid email ID");
            setMsgType("danger");
            return;
        }

        if (password.length < 4) {
            setMsg("Password is too short");
            setMsgType("danger");
            return;
        }

        setMsg("Login successful");
        setMsgType("success");

        setTimeout(() => {
            onLogin();
        }, 500);
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
                                        <label className="form-label">Email ID</label>
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
                                            <span className="fw-semibold">Register</span>
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
