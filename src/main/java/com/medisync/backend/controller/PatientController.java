package com.medisync.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.medisync.backend.entity.Patient;
import com.medisync.backend.service.PatientService;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // GET - Fetch all patients (JWT REQUIRED)
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // GET - Fetch patient by ID (JWT REQUIRED)
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id).orElse(null);
    }
}
