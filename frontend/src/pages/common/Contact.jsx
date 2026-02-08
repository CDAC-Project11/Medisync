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
                                src="https://dratdoorstep.com/wp-content/uploads/2025/07/Dr-at-door-homepage-banner-dr-image.png"
                                alt="Doctor"
                                className="doctor-img"
                            />

                            {/* MAP */}
                            <div className="map-box">
                                <a
                                    href="https://maps.app.goo.gl/rey6cuvnZ1xaSGTR6"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="map-link"
                                    aria-label="Open Ekvira Clinic location on Google Maps"
                                >
                                    <span className="visually-hidden">
                                        Open location in Google Maps
                                    </span>
                                </a>

                                <iframe
                                    title="Ekvira Clinic Location"
                                    src="https://www.google.com/maps?q=Ekvira+Clinic+Tagore+Nagar+Ashish+Heritage+Nashik+Maharashtra&output=embed"
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
                                    <strong>Degree:</strong> Bachelor of Homeopathic Medicine and Surgery (BHMS)
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
                                    <a href="tel:+919860737969" className="contact-link">
                                        +91 9860737969
                                    </a>
                                </span>
                            </div>

                            <div className="info-box">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>
                                    <strong>Address:</strong>{" "}
                                    Ekvira Clinic, Tagore Nagar, Ashish Heritage, Nashik, Maharashtra
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
