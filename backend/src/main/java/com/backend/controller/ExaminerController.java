package com.backend.controller;

import com.backend.model.Candidate;
import com.backend.service.ExaminerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/examiner")
public class ExaminerController {

    @Autowired
    private ExaminerService examinerService;

    @PostMapping("/register/candidate")
    public ResponseEntity<?> registerCandidate(@RequestBody Candidate candidate) {
        examinerService.registerCandidate(candidate);
        return ResponseEntity.ok("Candidate registered successfully");
    }

    @PostMapping("/register/candidates")
    public ResponseEntity<?> registerCandidates(@RequestParam("file") MultipartFile file) {
        try {
            examinerService.registerCandidatesFromFile(file);
            return ResponseEntity.ok("Candidates registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Failed to process file: " + e.getMessage());
        }
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

    @GetMapping("/candidates")
    public ResponseEntity<?> getAllCandidates() {
        List<Candidate> candidates = examinerService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/candidates/college/{college}")
    public ResponseEntity<List<Candidate>> getCandidatesByCollege(@PathVariable String college) {
        List<Candidate> candidates = examinerService.getCandidatesByCollege(college);
        return ResponseEntity.ok(candidates);
    }
}
