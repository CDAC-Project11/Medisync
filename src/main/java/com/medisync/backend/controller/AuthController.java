package com.medisync.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.medisync.backend.entity.Patient;
import com.medisync.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Patient register(@RequestBody Patient patient) {
        return authService.register(patient);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> request) {
        return authService.login(
                request.get("email"),
                request.get("password")
        );
    }
}
