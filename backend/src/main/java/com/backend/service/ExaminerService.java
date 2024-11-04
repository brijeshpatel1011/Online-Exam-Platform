package com.backend.service;

import com.backend.model.Candidate;
import com.backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExaminerService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerCandidate(Candidate candidate) {
        if (candidateRepository.findByEmail(candidate.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Candidate with this email already exists.");
        }
        candidate.setPassword(passwordEncoder.encode(candidate.getPassword()));
        candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long cId) {
        if (!candidateRepository.existsById(cId)) {
            throw new IllegalArgumentException("Candidate with ID " + cId + " does not exist.");
        }
        candidateRepository.deleteById(cId);
    }

    public Candidate updateCandidate(Long candidateId, Candidate updatedCandidate) {
        Optional<Candidate> existingCandidate = candidateRepository.findById(candidateId);
        if (existingCandidate.isPresent()) {
            Candidate candidate = existingCandidate.get();
            candidate.setEmail(updatedCandidate.getEmail());
            if (updatedCandidate.getPassword() != null && !updatedCandidate.getPassword().isEmpty()) {
                candidate.setPassword(passwordEncoder.encode(updatedCandidate.getPassword()));
            }
            return candidateRepository.save(candidate);
        } else {
            throw new IllegalArgumentException("Candidate with ID " + candidateId + " does not exist.");
        }
    }
}
