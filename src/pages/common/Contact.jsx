import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/common/contact.css";

function Contact() {
    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="contact-container mt-3">

                    <h2 className="title">Contact Us</h2>
                    <p className="subtitle">
                        Reach out to your trusted clinic anytime
                    </p>

                    <div className="row">
                        {/* LEFT: IMAGE + MAP */}
                        <div className="col-md-5">

                            {/* DOCTOR IMAGE */}
                            <img
                                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg"
                                alt="Doctor"
                                className="doctor-img"
                            />

                            {/* MAP */}
                            <div className="map-box">
                                <a
                                    href="https://www.google.com/maps?q=MediSync+Clinic+Pune"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="map-link"
                                    aria-label="Open MediSync Clinic location on Google Maps"
                                >
                                    <span className="visually-hidden">
                                        Open location in Google Maps
                                    </span>
                                </a>

                                <iframe
                                    title="MediSync Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3129234745!2d73.85674381505576!3d18.52043068740988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06da95df9c7%3A0x9a60360fb99be89!2sPune%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1709059000000"
                                    width="100%"
                                    height="260"
                                    style={{ border: 0, pointerEvents: "none" }}
                                    loading="lazy"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* RIGHT: INFO */}
                        <div className="col-md-7">

                            <p className="info-title">Clinic Details</p>

                            <div className="info-box">
                                <i className="bi bi-person-circle"></i>
                                <span>
                                    <strong>Doctor:</strong> Dr. Sachin Roundal
                                </span>
                            </div>

                            <div className="info-box">
                                <i className="bi bi-award-fill"></i>
                                <span>
                                    <strong>Degree:</strong> MBBS, MD (General Medicine)
                                </span>
                            </div>

                            <div className="info-box">
                                <i className="bi bi-heart-pulse-fill"></i>
                                <span>
                                    <strong>Specialization:</strong> General Physician & Family Doctor
                                </span>
                            </div>

                            <div className="info-box">
                                <i className="bi bi-telephone-fill"></i>
                                <span>
                                    <strong>Mobile:</strong>{" "}
                                    <a href="tel:+919999999999" className="contact-link">
                                        +91 99999 99999
                                    </a>
                                </span>
                            </div>

                            <div className="info-box">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>
                                    <strong>Address:</strong> MediSync Clinic, Pune, Maharashtra
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
