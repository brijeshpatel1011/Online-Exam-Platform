package com.backend.service;

import com.backend.dto.UserRegistrationDTO;
import com.backend.entity.Role;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerNewUser(UserRegistrationDTO registrationDTO) {
        // Only allow examiners to self-register
        if (registrationDTO.getRole() != Role.EXAMINER) {
            throw new RuntimeException("Only examiners can register themselves");
        }

        if (userRepository.findByUsername(registrationDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setRole(Role.EXAMINER);
        user.setEnabled(true); // Examiner is automatically enabled
        return userRepository.save(user);
    }

    public User addExaminee(UserRegistrationDTO examineeDTO) {
        if (userRepository.findByUsername(examineeDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User examinee = new User();
        examinee.setUsername(examineeDTO.getUsername());
        examinee.setEmail(examineeDTO.getEmail());
        examinee.setPassword(passwordEncoder.encode(examineeDTO.getPassword()));
        examinee.setRole(Role.EXAMINEE);
        examinee.setEnabled(true); // Examinee enabled after being added by examiner
        return userRepository.save(examinee);
    }
}
