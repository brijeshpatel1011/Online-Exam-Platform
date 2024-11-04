package com.backend.service;

import com.backend.model.Examiner;
import com.backend.model.LoginRequest;
import com.backend.repository.ExaminerRepository;
import com.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ExaminerRepository examinerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public void registerExaminer(Examiner examiner) {
        if (examinerRepository.findByEmail(examiner.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Examiner with this email already exists.");
        }
        examiner.setPassword(passwordEncoder.encode(examiner.getPassword()));
        examinerRepository.save(examiner);
    }

    public String authenticateUser(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return jwtTokenProvider.generateToken(loginRequest.getEmail());
    }
}
