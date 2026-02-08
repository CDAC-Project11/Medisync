package com.medisync.appointment_service.repository;

import com.medisync.appointment_service.entity.Bill;
import com.medisync.appointment_service.entity.PaymentStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {

	List<Bill> findAllByAppointmentId(Long appointmentId);
	Optional<Bill> findByAppointmentId(Long appointmentId);
    boolean existsByAppointmentId(Long appointmentId);
    List<Bill> findByPatientIdAndPaymentStatus(Long patientId, PaymentStatus paymentStatus);

    List<Bill> findByDoctorId(Long doctorId);

    List<Bill> findByDoctorIdAndPaymentStatusAndCreatedAtBetween(
    	    Long doctorId,
    	    PaymentStatus status,
    	    LocalDateTime from,
    	    LocalDateTime to
    	);

 // 👇 ADD THIS
    List<Bill> findByDoctorIdAndPaymentStatus(
        Long doctorId,
        PaymentStatus status
    );


}
