package com.backend.controller;

import com.backend.model.Candidate;
import com.backend.service.ExaminerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/examiner")
public class ExaminerController {

    @Autowired
    private ExaminerService examinerService;

    @PostMapping("/register/candidate")
    public ResponseEntity<?> registerCandidate(@RequestBody Candidate candidate) {
        examinerService.registerCandidate(candidate);
        return ResponseEntity.ok("Candidate registered successfully");
    }

    @DeleteMapping("/delete/candidate/{id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable Long id) {
        examinerService.deleteCandidate(id);
        return ResponseEntity.ok("Candidate deleted successfully");
    }

    @PutMapping("/update/candidate/{id}")
    public ResponseEntity<?> updateCandidate(@PathVariable Long id, @RequestBody Candidate updatedCandidate) {
        Candidate candidate = examinerService.updateCandidate(id, updatedCandidate);
        return ResponseEntity.ok(candidate);
    }
}
