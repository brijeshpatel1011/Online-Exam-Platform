package com.backend.security;

import com.backend.model.Candidate;
import com.backend.model.Examiner;
import com.backend.repository.CandidateRepository;
import com.backend.repository.ExaminerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

// UserDetailsServiceImpl.java
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ExaminerRepository examinerRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Examiner> examiner = examinerRepository.findByEmail(email);
        if (examiner.isPresent()) {
            return new org.springframework.security.core.userdetails.User(
                    examiner.get().getEmail(), examiner.get().getPassword(), new ArrayList<>());
        }
        Optional<Candidate> candidate = candidateRepository.findByEmail(email);
        if (candidate.isPresent()) {
            return new org.springframework.security.core.userdetails.User(
                    candidate.get().getEmail(), candidate.get().getPassword(), new ArrayList<>());
        }
        throw new UsernameNotFoundException("User not found");
    }
}
