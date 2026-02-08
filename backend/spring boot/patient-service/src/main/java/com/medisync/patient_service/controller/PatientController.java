package com.medisync.patient_service.controller;

import com.medisync.patient_service.dto.PatientProfileDto;
import com.medisync.patient_service.entity.Patient;
import com.medisync.patient_service.repository.PatientRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("/me")
    public PatientProfileDto getMyProfile(jakarta.servlet.http.HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("userId");

        Patient p = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return new PatientProfileDto(
                p.getId(),
                p.getPatientCode(),
                p.getName(),
                p.getGender(),
                p.getBloodGroup(),
                p.getMobile(),
                p.getEmail(),
                p.getAddress()
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        String role = (String) request.getAttribute("role");

        if (!"DOCTOR".equals(role) && !"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Access denied");
        }

        return patientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/basic")
    public ResponseEntity<?> getPatientBasicInfo(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        String role = (String) request.getAttribute("role");

        if (!("DOCTOR".equals(role) || "ADMIN".equals(role))) {
            return ResponseEntity.status(403).body("Access denied");
        }


        return patientRepository.findById(id)
            .map(patient -> {
                Map<String, Object> response = new HashMap<>();
                response.put("id", patient.getId());
                response.put("name", patient.getName());
                response.put("email", patient.getEmail());
                response.put("mobile", patient.getMobile());
                response.put("gender", patient.getGender());
                response.put("dob", patient.getDob());
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

}
