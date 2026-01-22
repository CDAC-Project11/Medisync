import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/common/notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    // Simulated backend fetch (replace with API later)
    useEffect(() => {
        setNotifications([
            {
                id: 1,
                title: "Appointment Confirmed",
                message: "Your appointment with Dr. Sachin Roundal is confirmed.",
                createdAt: "2025-02-10T10:30:00",
            },
            {
                id: 2,
                title: "Medical Report Ready",
                message: "Your blood test report is now available.",
                createdAt: "2025-02-11T09:15:00",
            },
        ]);
    }, []);

    // Delete notification
    const deleteNotification = (id) => {
        // Backend call can be added here
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="container mt-4">
                    <h2 className="text-white fw-bold mb-3">Notifications</h2>

                    <div className="glass-card">
                        {notifications.length === 0 ? (
                            <p className="text-center text-dark">
                                No notifications found.
                            </p>
                        ) : (
                            notifications.map((n) => (
                                <div className="notif-box" key={n.id}>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteNotification(n.id)}
                                        aria-label="Delete notification"
                                    >
                                        ×
                                    </button>

                                    <div className="notif-title">{n.title}</div>
                                    <div>{n.message}</div>

                                    <div className="notif-time">
                                        {new Date(n.createdAt).toLocaleString()}
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
