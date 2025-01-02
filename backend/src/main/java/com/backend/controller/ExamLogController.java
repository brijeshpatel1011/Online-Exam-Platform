package com.backend.controller;

import com.backend.model.ExamLog;
import com.backend.service.ExamLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exam-logs")
public class ExamLogController {
    @Autowired
    private ExamLogService examLogService;

    @PostMapping("/log")
    public ResponseEntity<?> logExamEvent(
            @RequestParam Long candidateId,
            @RequestParam int examId,
            @RequestParam int examFlag) {
        try {
            ExamLog log = examLogService.logExamEvent(candidateId, examId, examFlag);
            return ResponseEntity.ok(Map.of(
                    "message", "Exam event logged successfully",
                    "logId", log.getExamLogId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error logging exam event: " + e.getMessage());
        }
    }

    @GetMapping("/{examId}")
    public ResponseEntity<?> getExamLogs(@PathVariable Integer examId) {
        try {
            List<ExamLog> logs = examLogService.getExamLogsByExamId(examId);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving exam logs: " + e.getMessage());
        }
    }

    @GetMapping("/candidate/{candidateId}/exam/{examId}")
    public ResponseEntity<?> getCandidateExamLogs(
            @PathVariable Long candidateId,
            @PathVariable Integer examId) {
        try {
            List<ExamLog> logs = examLogService.getExamLogs(candidateId, examId);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving candidate exam logs: " + e.getMessage());
        }
    }
}