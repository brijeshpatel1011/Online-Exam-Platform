package com.backend.controller;

import com.backend.model.Examiner;
import com.backend.model.JwtResponse;
import com.backend.model.LoginRequest;
import com.backend.security.JwtTokenProvider;
import com.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register/examiner")
    public ResponseEntity<?> registerExaminer(@RequestBody Examiner examiner) {

        authService.registerExaminer(examiner);
        return ResponseEntity.ok("Examiner registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
