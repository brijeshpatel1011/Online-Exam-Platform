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
            throw new IllegalArgumentException("Candidate with this ID does not exist.");
        }
        candidateRepository.deleteById(cId);
    }

    public Candidate updateCandidate(Long candidateId, Candidate updatedCandidate) {
        Optional<Candidate> existingCandidate = candidateRepository.findById(candidateId);
        if (existingCandidate.isPresent()) {
            Candidate candidate = existingCandidate.get();
            candidate.setEmail(updatedCandidate.getEmail());
            candidate.setPassword(passwordEncoder.encode(updatedCandidate.getPassword()));
            // Update other fields as needed
            return candidateRepository.save(candidate);
        } else {
            throw new IllegalArgumentException("Candidate with this ID does not exist.");
        }
    }
}
