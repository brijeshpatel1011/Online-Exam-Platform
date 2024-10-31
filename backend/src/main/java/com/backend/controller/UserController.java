package com.backend.controller;

import com.backend.dto.UserRegistrationDTO;
import com.backend.entity.User;
import com.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerExaminer(@RequestBody UserRegistrationDTO registrationDTO) {
        try {
            User examiner = userService.registerNewUser(registrationDTO);
            return ResponseEntity.ok("Examiner registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Secured("ROLE_EXAMINER")
    @PostMapping("/examiner/addExaminee")
    public ResponseEntity<?> addExaminee(@RequestBody UserRegistrationDTO examineeDTO) {
        try {
            User examinee = userService.addExaminee(examineeDTO);
            return ResponseEntity.ok("Examinee added successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/examiner/home")
    public String examinerHome() {
        return "Welcome, Examiner!";
    }

    @GetMapping("/examinee/home")
    public String examineeHome() {
        return "Welcome, Examinee!";
    }

    @GetMapping("/login")
    public String login() {
        return "Please login";
    }
}
