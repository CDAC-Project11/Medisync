package com.medisync.appointment_service.controller.dto;

public class BillRequest {

    private Long appointmentId;
    private Long patientId;
    private Long doctorId;

    private Double consultationFee;
    private Double labFee;
    private Double serviceFee;

    private Double medicineTotal;
    private Double grandTotal;

    private String paymentMode;

	public Long getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public Double getConsultationFee() {
		return consultationFee;
	}

	public void setConsultationFee(Double consultationFee) {
		this.consultationFee = consultationFee;
	}

	public Double getLabFee() {
		return labFee;
	}

	public void setLabFee(Double labFee) {
		this.labFee = labFee;
	}

	public Double getServiceFee() {
		return serviceFee;
	}

	public void setServiceFee(Double serviceFee) {
		this.serviceFee = serviceFee;
	}

	public Double getMedicineTotal() {
		return medicineTotal;
	}

	public void setMedicineTotal(Double medicineTotal) {
		this.medicineTotal = medicineTotal;
	}

	public Double getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(Double grandTotal) {
		this.grandTotal = grandTotal;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

    // getters setters
    
    
}
