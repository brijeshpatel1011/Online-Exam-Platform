package com.backend.controller;

import com.backend.model.Exam;
import com.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    // Fetch all exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    // Fetch an exam by ID
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable int id) {
        Optional<Exam> exam = examService.getExamById(id);
        return exam.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create an exam
    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam savedExam = examService.createExam(exam);
        return ResponseEntity.ok(savedExam);
    }

    // Update an existing exam along with questions
    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable int id, @RequestBody Exam examDetails) {
        try {
            Exam updatedExam = examService.updateExam(id, examDetails);
            return ResponseEntity.ok(updatedExam);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Delete an exam by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExamById(@PathVariable int id) {
        try {
            examService.deleteExamById(id);
            return ResponseEntity.ok("Exam deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Fetch exams by college
    @GetMapping("/college/{college}")
    public ResponseEntity<List<Exam>> getExamsByCollege(@PathVariable String college) {
        List<Exam> exams = examService.getExamsByCollege(college);
        return ResponseEntity.ok(exams);
    }

    // Fetch exams by start date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Exam>> getExamsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<Exam> exams = examService.getExamsByDateRange(startDate, endDate);
        return ResponseEntity.ok(exams);
    }
}
