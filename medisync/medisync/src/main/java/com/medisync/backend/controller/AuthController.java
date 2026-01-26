package com.medisync.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medisync.backend.dto.LoginRequest;
import com.medisync.backend.dto.LoginResponse;
import com.medisync.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (token.equals("Invalid Email") || token.equals("Invalid Password")) {
            return ResponseEntity.badRequest().body(token);
        }

        return ResponseEntity.ok(new LoginResponse(token));
    }
}
