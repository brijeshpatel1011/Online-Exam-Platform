package com.backend.controller;

import com.backend.model.*;
import com.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping("/create")
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @PostMapping("/{examId}/start/{candidateId}")
    public CandidateExam startExam(@PathVariable Long candidateId, @PathVariable Long examId) {
        return examService.startExam(candidateId, examId);
    }

    @PostMapping("/{candidateExamId}/submit-mcq")
    public CandidateMCQAnswers submitMcqAnswer(
            @PathVariable Long candidateExamId,
            @RequestParam Long mcqId,
            @RequestParam String selectedOption) {
        return examService.submitMcqAnswer(candidateExamId, mcqId, selectedOption);
    }

    @GetMapping("/{candidateExamId}/result")
    public int getExamScore(@PathVariable Long candidateExamId) {
        return examService.calculateExamScore(candidateExamId);
    }

    @GetMapping("/{candidateExamId}/detailed-result")
    public CandidateExam getCandidateExamResult(@PathVariable Long candidateExamId) {
        return examService.getCandidateExamResult(candidateExamId);
    }

    @GetMapping("/status/{examId}")
    public ResponseEntity<Object> getExamStatus(@PathVariable("examId") Long examId) {
        Optional<CandidateExam> examStatus = examService.getExamStatusByExamId(examId);

        if (examStatus.isPresent()) {
            return ResponseEntity.ok(examStatus.get().getStatus());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exam not found");
        }
    }


}
