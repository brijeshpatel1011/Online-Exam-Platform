package com.backend.controller;

import com.backend.model.*;
import com.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    // Admin: Get all exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @PostMapping("/{examId}/start/{candidateId}")
    public CandidateExam startExam(@PathVariable Long candidateId, @PathVariable Long examId) {
        return examService.startExam(candidateId, examId);
    }

}
