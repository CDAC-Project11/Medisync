import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/common/notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // TEMP ROLE — Replace later with auth/backend
    const role = sessionStorage.getItem("role") || "PATIENT";

    useEffect(() => {
        // Simulated backend fetch
        setTimeout(() => {
            setNotifications([
                {
                    id: 1,
                    type: "INFO",
                    title: "Appointment Confirmed",
                    message: "Your appointment with Dr. Sachin Roundal is confirmed.",
                    createdAt: "2025-02-10T10:30:00",
                    read: false,
                    role: "PATIENT"
                },
                {
                    id: 2,
                    type: "INFO",
                    title: "Medical Report Ready",
                    message: "Your blood test report is now available.",
                    createdAt: "2025-02-11T09:15:00",
                    read: false,
                    role: "PATIENT"
                },
                {
                    id: 3,
                    type: "BILL",
                    title: "Bill Generated",
                    message: "Your hospital bill of ₹700 is ready.",
                    amount: 700, // 🔥 BILL AMOUNT
                    createdAt: "2025-02-12T11:00:00",
                    read: false,
                    role: "PATIENT"
                },
                {
                    id: 4,
                    type: "INFO",
                    title: "New Patient Appointment",
                    message: "You have a new pending appointment request.",
                    createdAt: "2025-02-12T08:30:00",
                    read: false,
                    role: "DOCTOR"
                }
            ]);
            setLoading(false);
        }, 500);
    }, []);

    // Delete notification
    const deleteNotification = (id) => {
        if (!window.confirm("Delete this notification?")) return;
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    // Mark as read
    const markAsRead = (id) => {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    // Pay Now handler
    const handlePayNow = (amount) => {
        navigate("/payment", {
            state: { amount }
        });
    };

    // Filter by role
    const filteredNotifications = notifications.filter(
        (n) => n.role === role
    );

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="container mt-4">
                    <h2 className="text-white fw-bold mb-3">
                        {role === "DOCTOR" ? "Doctor Notifications" : "Notifications"}
                    </h2>

                    <div className="glass-card">

                        {loading ? (
                            <p className="text-center text-dark">
                                Loading notifications...
                            </p>
                        ) : filteredNotifications.length === 0 ? (
                            <p className="text-center text-muted">
                                No notifications found.
                            </p>
                        ) : (
                            filteredNotifications.map((n) => (
                                <div
                                    className={`notif-box ${n.read ? "read" : ""}`}
                                    key={n.id}
                                >
                                    {/* DELETE */}
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteNotification(n.id)}
                                    >
                                        ×
                                    </button>

                                    {/* TITLE */}
                                    <div className="notif-title">
                                        {n.title}
                                        {!n.read && (
                                            <span className="badge bg-primary ms-2">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    {/* MESSAGE */}
                                    <div>{n.message}</div>

                                    {/* TIME */}
                                    <div className="notif-time">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="mt-2 d-flex gap-2 flex-wrap">
                                        {!n.read && (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => markAsRead(n.id)}
                                            >
                                                Mark as Read
                                            </button>
                                        )}

                                        {/* 💳 PAY NOW ONLY FOR BILL */}
                                        {n.type === "BILL" && role === "PATIENT" && (
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handlePayNow(n.amount)}
                                            >
                                                Pay Now ₹{n.amount}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Notifications;
