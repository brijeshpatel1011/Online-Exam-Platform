package com.backend.controller;

import com.backend.service.ExamResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")

public class AdminExamResultsController {

    @Autowired
    private ExamResultsService examResultsService;

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Map<String, Object>>> getExamResults(@PathVariable Integer examId) {
        return ResponseEntity.ok(examResultsService.getCandidatePerformance(examId));
    }

    @GetMapping("/exam/{examId}/passing-rate")
    public ResponseEntity<Map<String, Object>> getExamPassingRate(@PathVariable Integer examId) {
        return ResponseEntity.ok(examResultsService.getExamPassingRate(examId));
    }

    @GetMapping("/exam/{examId}/average-scores")
    public ResponseEntity<Map<String, Double>> getExamAverageScores(@PathVariable Integer examId) {
        return ResponseEntity.ok(examResultsService.getExamAverageScores(examId));
    }

    @GetMapping("/statistics/all")
    public ResponseEntity<List<Map<String, Object>>> getAllExamsStatistics() {
        return ResponseEntity.ok(examResultsService.getAllExamsStatistics());
    }

    @GetMapping("/exam/{examId}/candidates")
    public ResponseEntity<List<Map<String, Object>>> getCandidatePerformance(@PathVariable Integer examId) {
        return ResponseEntity.ok(examResultsService.getCandidatePerformance(examId));
    }

    // Add new endpoint for detailed candidate results
    @GetMapping("/exam/{examId}/candidate/{candidateId}")
    public ResponseEntity<Map<String, Object>> getCandidateExamDetail(
            @PathVariable Integer examId,
            @PathVariable Long candidateId) {
        return ResponseEntity.ok(examResultsService.getCandidateExamDetail(examId, candidateId));
    }
}