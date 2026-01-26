package com.medisync.backend.service;

import com.medisync.backend.dto.AppointmentRequest;
import com.medisync.backend.dto.AppointmentResponse;

import java.util.List;

public interface AppointmentService {

    AppointmentResponse createAppointment(AppointmentRequest request);

    AppointmentResponse getAppointment(Long appointmentId);

    AppointmentResponse updateAppointment(Long appointmentId, AppointmentRequest request);

    void deleteAppointment(Long appointmentId);

    List<AppointmentResponse> getAllAppointments();
}
