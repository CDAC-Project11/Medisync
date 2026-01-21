import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/common/feedback.css";

function Feedback() {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null); // success | error
    const patientName = "Nikita Zarekar"; // from backend later

    const submitFeedback = () => {
        if (rating === 0) {
            setStatus({ type: "error", text: "Please select a rating." });
            return;
        }

        if (message.trim().length < 5) {
            setStatus({ type: "error", text: "Feedback message is too short." });
            return;
        }

        // Backend API call can be added here
        /*
        fetch("http://localhost:8080/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, message })
        });
        */

        setStatus({ type: "success", text: "Thank you for your feedback!" });
        setRating(0);
        setMessage("");
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-7">

                            <div className="glass-card">
                                <h2 className="text-center fw-bold mb-2">Feedback</h2>
                                <p className="text-center">We appreciate your thoughts!</p>

                                {/* Patient Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Patient Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={patientName}
                                        disabled
                                    />
                                </div>

                                {/* Message Box */}
                                {status && (
                                    <div
                                        className={`msg-box ${status.type === "success"
                                            ? "msg-success"
                                            : "msg-error"
                                            }`}
                                    >
                                        {status.text}
                                    </div>
                                )}

                                {/* Rating */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Rate Your Experience
                                    </label>
                                    <div>
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <span
                                                key={val}
                                                className={`rating-star ${rating >= val ? "active" : ""
                                                    }`}
                                                onClick={() => setRating(val)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback Text */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Feedback</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Write your feedback..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    className="btn btn-primary w-100 mt-2"
                                    onClick={submitFeedback}
                                >
                                    Submit Feedback
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feedback;
