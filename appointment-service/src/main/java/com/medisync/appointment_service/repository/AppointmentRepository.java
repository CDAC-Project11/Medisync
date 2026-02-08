package com.medisync.appointment_service.repository;

import com.medisync.appointment_service.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Patient: view own appointments
    List<Appointment> findByPatientId(Long patientId);

    // Doctor: view appointments for a date
    List<Appointment> findByDoctorIdAndAppointmentDate(
            Long doctorId,
            LocalDate appointmentDate
    );
    List<Appointment> findByDoctorId(Long doctorId);

}
