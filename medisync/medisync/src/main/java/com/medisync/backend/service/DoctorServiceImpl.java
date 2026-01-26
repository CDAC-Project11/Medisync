package com.medisync.backend.service;

import org.springframework.stereotype.Service;
import com.medisync.backend.dto.DoctorRequest;
import com.medisync.backend.dto.DoctorResponse;
import com.medisync.backend.entity.Doctor;
import com.medisync.backend.exception.ResourceNotFoundException;
import com.medisync.backend.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public DoctorResponse createDoctor(DoctorRequest request) {

        if (doctorRepository.count() > 0) {
            throw new RuntimeException("Doctor profile already exists");
        }

        Doctor doctor = new Doctor();
        doctor.setName(request.getName());
        doctor.setEmail(request.getEmail());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setPhone(request.getPhone());
        doctor.setExperience(request.getExperience());
        doctor.setTiming(request.getTiming());
        doctor.setAbout(request.getAbout());

        return mapToResponse(doctorRepository.save(doctor));
    }

    @Override
    public DoctorResponse getDoctor() {

        Doctor doctor = doctorRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        return mapToResponse(doctor);
    }

    @Override
    public DoctorResponse updateDoctor(DoctorRequest request) {

        Doctor doctor = doctorRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        doctor.setName(request.getName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setPhone(request.getPhone());
        doctor.setExperience(request.getExperience());
        doctor.setTiming(request.getTiming());
        doctor.setAbout(request.getAbout());

        return mapToResponse(doctorRepository.save(doctor));
    }

    private DoctorResponse mapToResponse(Doctor doctor) {

        DoctorResponse response = new DoctorResponse();
        response.setDoctorId(doctor.getDoctorId());
        response.setName(doctor.getName());
        response.setEmail(doctor.getEmail());
        response.setSpecialization(doctor.getSpecialization());
        response.setQualification(doctor.getQualification());
        response.setPhone(doctor.getPhone());
        response.setExperience(doctor.getExperience());
        response.setTiming(doctor.getTiming());
        response.setAbout(doctor.getAbout());
        response.setCreatedAt(doctor.getCreatedAt());

        return response;
    }
}
