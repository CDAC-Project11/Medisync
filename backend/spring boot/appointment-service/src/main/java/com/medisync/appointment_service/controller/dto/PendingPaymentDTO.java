package com.medisync.appointment_service.controller.dto;


public class PendingPaymentDTO {

    private boolean hasPending;
    private double amount;
    private String appointmentId;
    private Long billId;
    private String status;
    private String message;
	public boolean isHasPending() {
		return hasPending;
	}
	public void setHasPending(boolean hasPending) {
		this.hasPending = hasPending;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}
	public Long getBillId() {
		return billId;
	}
	public void setBillId(Long billId) {
		this.billId = billId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

    // getters & setters
    
    
}

