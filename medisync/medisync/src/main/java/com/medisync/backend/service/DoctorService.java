package com.medisync.backend.service;

import com.medisync.backend.dto.DoctorRequest;
import com.medisync.backend.dto.DoctorResponse;

public interface DoctorService {

    DoctorResponse createDoctor(DoctorRequest request);

    DoctorResponse getDoctor();

    DoctorResponse updateDoctor(DoctorRequest request);
}
