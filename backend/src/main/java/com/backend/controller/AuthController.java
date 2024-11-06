package com.backend.controller;

import com.backend.model.Candidate;
import com.backend.model.Examiner;
import com.backend.model.JwtResponse;
import com.backend.model.LoginRequest;
import com.backend.security.JwtTokenProvider;
import com.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/register/candidate")
    public ResponseEntity<?> registerCandidate(@RequestBody Candidate candidate) {
        authService.registerCandidate(candidate);
        return ResponseEntity.ok("Candidate registered successfully");
    }

    @PostMapping("/login/examiner")
    public ResponseEntity<?> loginExaminer(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticateExaminer(loginRequest);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/login/candidate")
    public ResponseEntity<?> loginCandidate(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticateCandidate(loginRequest);
        return ResponseEntity.ok(new JwtResponse(token));
    }
}

