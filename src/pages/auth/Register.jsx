import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/auth/register.css";

function Register() {
    // ---------------- STATE ----------------
    const [form, setForm] = useState({
        name: "",
        gender: "",
        dob: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        cpassword: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // ---------------- REGEX ----------------
    const nameRegex = /^[A-Za-z ]{2,}$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*\-^]).{6,12}$/;

    // ---------------- HANDLE CHANGE ----------------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ---------------- VALIDATION ----------------
    const validate = () => {
        let err = {};

        if (!form.name || !nameRegex.test(form.name))
            err.name = "Invalid name (letters & spaces only)";

        if (!form.gender) err.gender = "Please select gender";

        if (!form.dob) err.dob = "Date of birth required";

        if (!mobileRegex.test(form.mobile))
            err.mobile = "Invalid mobile number";

        if (!emailRegex.test(form.email))
            err.email = "Invalid email address";

        if (form.address.length < 5)
            err.address = "Address too short";

        if (!passRegex.test(form.password))
            err.password =
                "Password must contain upper, lower, digit & special char";

        if (form.password !== form.cpassword)
            err.cpassword = "Passwords do not match";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    // ---------------- SUBMIT ----------------
    const handleSubmit = async () => {
        setMessage("");

        if (!validate()) {
            setMessage("Please fix the highlighted errors.");
            return;
        }

        const payload = {
            name: form.name,
            gender: form.gender,
            dob: form.dob,
            mobile: form.mobile,
            email: form.email,
            address: form.address,
            password: form.password,
        };

        try {
            // 🔗 BACKEND CALL (enable when backend is ready)
            /*
            await axios.post("http://localhost:8080/api/register", payload);
            */

            setMessage("Registration successful! Please login.");
            setForm({
                name: "",
                gender: "",
                dob: "",
                mobile: "",
                email: "",
                address: "",
                password: "",
                cpassword: "",
            });
        } catch (err) {
            setMessage("Registration failed. Try again.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="container d-flex justify-content-center">
                    <div className="col-md-7 col-lg-6">

                        <div className="card shadow-lg border-0 reg-card">
                            <div className="card-body p-4">

                                <h3 className="mb-3">Patient Registration</h3>

                                {message && (
                                    <p className="text-center fw-semibold text-danger">
                                        {message}
                                    </p>
                                )}

                                {/* NAME + GENDER */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            name="name"
                                            className="form-control"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                        <small className="text-danger">{errors.name}</small>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Gender</label>
                                        <select
                                            name="gender"
                                            className="form-select"
                                            value={form.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                        <small className="text-danger">{errors.gender}</small>
                                    </div>
                                </div>

                                {/* DOB + MOBILE */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            className="form-control"
                                            value={form.dob}
                                            onChange={handleChange}
                                        />
                                        <small className="text-danger">{errors.dob}</small>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Mobile</label>
                                        <input
                                            name="mobile"
                                            className="form-control"
                                            value={form.mobile}
                                            onChange={handleChange}
                                        />
                                        <small className="text-danger">{errors.mobile}</small>
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.email}</small>
                                </div>

                                {/* ADDRESS */}
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="2"
                                        value={form.address}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.address}</small>
                                </div>

                                {/* PASSWORD */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={form.password}
                                            onChange={handleChange}
                                        />
                                        <small className="text-danger">{errors.password}</small>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="cpassword"
                                            className="form-control"
                                            value={form.cpassword}
                                            onChange={handleChange}
                                        />
                                        <small className="text-danger">
                                            {errors.cpassword}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={handleSubmit}>
                                        Register
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
