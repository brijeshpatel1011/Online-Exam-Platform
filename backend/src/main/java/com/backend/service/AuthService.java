package com.backend.service;

import com.backend.model.Candidate;
import com.backend.model.Examiner;
import com.backend.model.LoginRequest;
import com.backend.repository.CandidateRepository;
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
    private CandidateRepository candidateRepository;

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

    public void registerCandidate(Candidate candidate) {
        if (candidateRepository.findByEmail(candidate.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Candidate with this email already exists.");
        }
        candidate.setPassword(passwordEncoder.encode(candidate.getPassword()));
        candidateRepository.save(candidate);
    }

    public String authenticateExaminer(LoginRequest loginRequest) {
        var examiner = examinerRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return jwtTokenProvider.generateToken(loginRequest.getEmail(), examiner.getEId());
    }

    public String authenticateCandidate(LoginRequest loginRequest) {
        var candidate = candidateRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return jwtTokenProvider.generateToken(loginRequest.getEmail(), candidate.getCId());
    }

}

