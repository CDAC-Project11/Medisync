package com.medisync.backend.dto;

public class FeedbackRequestDTO {
    private Long patientId;
    private String message;

    // Getters & Setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
