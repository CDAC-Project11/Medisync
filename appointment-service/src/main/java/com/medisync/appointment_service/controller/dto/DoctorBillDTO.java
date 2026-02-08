package com.medisync.appointment_service.controller.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DoctorBillDTO {

    public Long billId;
    public Long patientId;
    public String patientName;
    public Long appointmentId;
    public BigDecimal amount;
    public String mode;
    public LocalDateTime date;
    public String status;
}
