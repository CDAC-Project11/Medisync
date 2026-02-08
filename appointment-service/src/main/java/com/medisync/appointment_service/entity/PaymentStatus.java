package com.medisync.appointment_service.entity;

public enum PaymentStatus {
    DRAFT,     // Generated but not sent
    SENT,      // Sent to patient (UPI)
    PAID,      // Payment completed
    FAILED
}
