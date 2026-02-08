package com.medisync.appointment_service.client;

import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class NotificationClient {

    // Used by AppointmentController
    public void sendNotification(Map<String, Object> data) {
        System.out.println("Notification MOCK: " + data);
    }

    // Used by BillController
    public void send(Map<String, Object> data) {
        System.out.println("Notification MOCK: " + data);
    }
}
