package com.medisync.appointment_service.controller;

import com.medisync.appointment_service.client.NotificationClient;
import com.medisync.appointment_service.controller.dto.CreateAppointmentRequest;
import com.medisync.appointment_service.controller.dto.UpdateAppointmentStatusRequest;
import com.medisync.appointment_service.entity.Appointment;
import com.medisync.appointment_service.entity.Bill;
import com.medisync.appointment_service.entity.PaymentStatus;
import com.medisync.appointment_service.repository.AppointmentRepository;
import com.medisync.appointment_service.repository.BillRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final BillRepository billRepository;
    private final NotificationClient notificationClient;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            BillRepository billRepository,
            NotificationClient notificationClient
    ) {
        this.appointmentRepository = appointmentRepository;
        this.billRepository = billRepository;
        this.notificationClient = notificationClient;
    }

    // ================= DOCTOR =================

    @GetMapping("/doctor/all")
    public ResponseEntity<?> getAllAppointmentsForDoctor(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");

        if (!"DOCTOR".equals(role) && !"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Access denied");
        }

        return ResponseEntity.ok(
                appointmentRepository.findByDoctorId(1L)
        );
    }

    // ================= PATIENT =================

    @PostMapping
    public ResponseEntity<?> bookAppointment(
            @Valid @RequestBody CreateAppointmentRequest request,
            HttpServletRequest httpRequest
    ) {
        Long patientId = (Long) httpRequest.getAttribute("userId");
        String role = (String) httpRequest.getAttribute("role");

        if (!"PATIENT".equals(role)) {
            return ResponseEntity.status(403).body("Only patients can book appointments");
        }

        Appointment appointment = new Appointment();
        appointment.setPatientId(patientId);
        appointment.setDoctorId(1L);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus("PENDING");

        return ResponseEntity.ok(
                appointmentRepository.save(appointment)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyAppointments(HttpServletRequest request) {
        Long patientId = (Long) request.getAttribute("userId");

        return ResponseEntity.ok(
                appointmentRepository.findByPatientId(patientId)
        );
    }

    // ================= CONSULTATION =================

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody UpdateAppointmentStatusRequest request,
            HttpServletRequest httpRequest
    ) {
        String role = (String) httpRequest.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(403).body("Only doctor can update appointment");
        }

        return appointmentRepository.findById(id)
                .map(appointment -> {

                    String newStatus = request.getStatus().toUpperCase();
                    appointment.setStatus(newStatus);

                    appointmentRepository.save(appointment);

                    // ✅ ONLY STATUS CHANGE – NO BILL LOGIC
                    return ResponseEntity.ok(appointment);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // ================= BILLING =================

    @PostMapping("/doctor/{appointmentId}/send-bill")
    public ResponseEntity<?> sendBill(
            @PathVariable Long appointmentId,
            @RequestParam("mode") String paymentMode,
            HttpServletRequest request
    ) {
        String role = (String) request.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(403).body("Only doctor can send bill");
        }

        Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Bill bill = billRepository.findByAppointmentId(appointmentId)
            .orElseThrow(() -> new RuntimeException("Bill not found"));

        // 💵 CASH FLOW
        if ("CASH".equalsIgnoreCase(paymentMode)) {

            bill.setPaymentStatus(PaymentStatus.PAID);
            billRepository.save(bill);

            notificationClient.sendNotification(Map.of(

            	        "userId", appointment.getPatientId(),
            	        "title", "Bill Generated",
            	        "message", "Bill paid in cash. Invoice generated.",
            	        "referenceType", "BILL",
            	        "referenceId", bill.getId()
            	    )
            	);


            return ResponseEntity.ok("Cash payment recorded");
        }

        // 💳 ONLINE / UPI FLOW
        bill.setPaymentStatus(PaymentStatus.SENT);
        billRepository.save(bill);

        notificationClient.sendNotification(Map.of(

        	        "userId", appointment.getPatientId(),
        	        "title", "Payment Request",
        	        "message", "Payment request sent. Please complete payment.",
        	        "referenceType", "PAYMENT",
        	        "referenceId", bill.getId()
        	    )
        	);


        return ResponseEntity.ok("Payment request sent");
    }

}
