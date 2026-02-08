package com.medisync.appointment_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class AppointmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppointmentServiceApplication.class, args);
    }

    // ✅ ADD THIS METHOD EXACTLY HERE
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
