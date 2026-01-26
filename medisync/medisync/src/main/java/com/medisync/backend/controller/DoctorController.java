package com.medisync.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medisync.backend.dto.DoctorRequest;
import com.medisync.backend.dto.DoctorResponse;
import com.medisync.backend.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Create doctor
    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(@RequestBody DoctorRequest request) {
        DoctorResponse response = doctorService.createDoctor(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get doctor
    @GetMapping
    public ResponseEntity<DoctorResponse> getDoctor() {
        DoctorResponse response = doctorService.getDoctor();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Update doctor
    @PutMapping
    public ResponseEntity<DoctorResponse> updateDoctor(@RequestBody DoctorRequest request) {
        DoctorResponse response = doctorService.updateDoctor(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
