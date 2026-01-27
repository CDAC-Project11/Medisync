import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/common/notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // TEMP ROLE — Replace later with auth/backend
    const role = localStorage.getItem("role") || "PATIENT";

    useEffect(() => {
        // Simulated backend fetch
        setTimeout(() => {
            setNotifications([
                {
                    id: 1,
                    title: "Appointment Confirmed",
                    message: "Your appointment with Dr. Sachin Roundal is confirmed.",
                    createdAt: "2025-02-10T10:30:00",
                    read: false,
                    role: "PATIENT"
                },
                {
                    id: 2,
                    title: "Medical Report Ready",
                    message: "Your blood test report is now available.",
                    createdAt: "2025-02-11T09:15:00",
                    read: false,
                    role: "PATIENT"
                },
                {
                    id: 3,
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
                            <p className="text-center text-dark">Loading notifications...</p>
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
                                        aria-label="Delete notification"
                                    >
                                        ×
                                    </button>

                                    {/* TITLE */}
                                    <div className="notif-title">
                                        {n.title}
                                        {!n.read && (
                                            <span className="badge bg-primary ms-2">New</span>
                                        )}
                                    </div>

                                    {/* MESSAGE */}
                                    <div>{n.message}</div>

                                    {/* TIME */}
                                    <div className="notif-time">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </div>

                                    {/* ACTION */}
                                    {!n.read && (
                                        <button
                                            className="btn btn-sm btn-outline-primary mt-2"
                                            onClick={() => markAsRead(n.id)}
                                        >
                                            Mark as Read
                                        </button>
                                    )}
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
