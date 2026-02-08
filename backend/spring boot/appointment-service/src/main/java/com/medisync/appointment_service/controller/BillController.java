package com.medisync.appointment_service.controller;

import com.medisync.appointment_service.client.NotificationClient;
import com.medisync.appointment_service.controller.dto.BillRequest;
import com.medisync.appointment_service.controller.dto.DoctorBillDTO;
import com.medisync.appointment_service.entity.*;
import com.medisync.appointment_service.repository.AppointmentRepository;
import com.medisync.appointment_service.repository.BillRepository;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;

import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/bills")
public class BillController {

    // ✅ FIX 1 – Repository ENABLED
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private NotificationClient notificationClient;

    // ✅ FIX 2 – RestTemplate ONLY (NO PatientClient)
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/test")
    public String test() {
        return "bill controller alive";
    }

    // ================= CREATE BILL =================

    @PostMapping
    public ResponseEntity<?> createBill(
            @RequestBody BillRequest req,
            HttpServletRequest request) {

        String role = (String) request.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(403)
                    .body("Only doctor can create bill");
        }

        if (billRepository.existsByAppointmentId(req.getAppointmentId())) {
            return ResponseEntity
                    .badRequest()
                    .body("Bill already generated for this appointment");
        }

        Appointment appointment =
            appointmentRepository.findById(req.getAppointmentId())
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Bill bill = new Bill();

        bill.setAppointmentId(req.getAppointmentId());
        bill.setPatientId(req.getPatientId());
        bill.setDoctorId(appointment.getDoctorId());

        bill.setConsultationFee(BigDecimal.valueOf(req.getConsultationFee()));
        bill.setLabFee(BigDecimal.valueOf(req.getLabFee()));
        bill.setServiceFee(BigDecimal.valueOf(req.getServiceFee()));
        bill.setMedicineTotal(BigDecimal.valueOf(req.getMedicineTotal()));
        bill.setGrandTotal(BigDecimal.valueOf(req.getGrandTotal()));

        PaymentMode mode =
            PaymentMode.valueOf(req.getPaymentMode().toUpperCase());

        bill.setPaymentMode(mode);

        bill.setPaymentStatus(
            mode == PaymentMode.CASH
                ? PaymentStatus.PAID
                : PaymentStatus.SENT
        );

        Bill savedBill = billRepository.save(bill);

        try {
            Map<String, Object> notification = new HashMap<>();

            notification.put("userId", appointment.getPatientId());
            notification.put("referenceId", savedBill.getId());

            if (mode == PaymentMode.CASH) {
                notification.put("title", "Bill Generated");
                notification.put("message",
                    "Your bill is generated. Please pay at clinic counter.");
                notification.put("referenceType", "BILL");
            } else {
                notification.put("title", "Payment Request");
                notification.put("message",
                    "Payment request received. Click to pay your bill.");
                notification.put("referenceType", "PAYMENT");
            }

            notificationClient.send(notification);

        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Bill Created Successfully");
    }

    // ================= PATIENT HISTORY =================

    @GetMapping("/history/{patientId}")
    public ResponseEntity<?> paymentHistory(@PathVariable String patientId) {

        List<Bill> bills = billRepository.findByPatientIdAndPaymentStatus(
            Long.parseLong(patientId),
            PaymentStatus.PAID
        );

        List<Map<String, Object>> list = new ArrayList<>();

        for (Bill b : bills) {
            Map<String, Object> m = new HashMap<>();

            m.put("billId", b.getId());
            m.put("amount", b.getGrandTotal());
            m.put("appointmentId", b.getAppointmentId());
            m.put("mode", b.getPaymentMode().name());
            m.put("date", b.getCreatedAt());
            m.put("status", b.getPaymentStatus().name());

            list.add(m);
        }

        return ResponseEntity.ok(
            Map.of("hasHistory", !list.isEmpty(), "bills", list)
        );
    }

    // ================= DOCTOR VIEW =================

    @GetMapping("/doctor/all")
    public ResponseEntity<?> getAllBillsForDoctor(
            @RequestParam Long doctorId,
            @RequestParam(required = false) String search) {

        List<Bill> bills;

        LocalDate today = LocalDate.now();

        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.atTime(23, 59, 59);

        if (search == null || search.isEmpty()) {

            bills = billRepository
                .findByDoctorIdAndPaymentStatusAndCreatedAtBetween(
                    doctorId,
                    PaymentStatus.PAID,
                    start,
                    end
                );

        } else {

            bills = billRepository
                .findByDoctorIdAndPaymentStatus(
                    doctorId,
                    PaymentStatus.PAID
                );
        }

        List<DoctorBillDTO> result = new ArrayList<>();

        for (Bill b : bills) {

            String name = getPatientName(b.getPatientId());

            if (search != null && !search.isEmpty()) {
                if (!name.toLowerCase()
                        .contains(search.toLowerCase())) {
                    continue;
                }
            }

            DoctorBillDTO dto = new DoctorBillDTO();

            dto.billId = b.getId();
            dto.patientId = b.getPatientId();
            dto.patientName = name;
            dto.appointmentId = b.getAppointmentId();
            dto.amount = b.getGrandTotal();
            dto.mode = b.getPaymentMode().name();
            dto.date = b.getCreatedAt();
            dto.status = b.getPaymentStatus().name();

            result.add(dto);
        }

        return ResponseEntity.ok(result);
    }

    // ================= HELPER =================

    private String getPatientName(Long id) {

        try {
            String url = "http://localhost:8081/patients/" + id;

            Map<String, Object> p =
                restTemplate.getForObject(url, Map.class);

            return (String) p.get("name");

        } catch (Exception e) {
            return "Unknown Patient";
        }
    }
    
    
 // ================= PENDING PAYMENTS =================

    @GetMapping("/pending/{patientId}")
    public ResponseEntity<?> checkPending(@PathVariable String patientId) {

        List<Bill> bills = billRepository.findByPatientIdAndPaymentStatus(
            Long.parseLong(patientId),
            PaymentStatus.SENT
        );

        if (bills.isEmpty()) {
            return ResponseEntity.ok(
                Map.of(
                    "hasPending", false,
                    "message", "No payment pending"
                )
            );
        }

        List<Map<String, Object>> list = new ArrayList<>();

        for (Bill b : bills) {

            Map<String, Object> m = new HashMap<>();

            m.put("billId", b.getId());
            m.put("amount", b.getGrandTotal());
            m.put("appointmentId", b.getAppointmentId());
            m.put("status", b.getPaymentStatus().name());

            list.add(m);
        }

        return ResponseEntity.ok(
            Map.of(
                "hasPending", true,
                "bills", list
            )
        );
    }
    
    @PutMapping("/mark-paid")
    public ResponseEntity<?> markPaid(@RequestBody Map<String, String> req) {

        Long appointmentId = Long.parseLong(req.get("appointmentId"));

        Optional<Bill> opt =
            billRepository.findByAppointmentId(appointmentId);

        if (opt.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Bill not found"));
        }

        Bill bill = opt.get();

        bill.setPaymentStatus(PaymentStatus.PAID);
        bill.setPaymentMode(PaymentMode.UPI);

        billRepository.save(bill);

        return ResponseEntity.ok(
            Map.of(
                "message", "Bill marked as PAID",
                "billId", bill.getId()
            )
        );
    }


    
}
