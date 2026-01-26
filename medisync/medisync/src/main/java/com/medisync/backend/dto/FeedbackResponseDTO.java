package com.medisync.backend.dto;

import java.time.LocalDateTime;

public class FeedbackResponseDTO {
    private Long feedbackId;
    private Long patientId;
    private String message;
    private LocalDateTime createdAt;

    public FeedbackResponseDTO(Long feedbackId, Long patientId, String message, LocalDateTime createdAt) {
        this.feedbackId = feedbackId;
        this.patientId = patientId;
        this.message = message;
        this.createdAt = createdAt;
    }

    // Getters
    public Long getFeedbackId() { return feedbackId; }
    public Long getPatientId() { return patientId; }
    public String getMessage() { return message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
