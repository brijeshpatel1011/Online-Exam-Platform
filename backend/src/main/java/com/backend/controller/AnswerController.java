package com.backend.controller;

import com.backend.model.*;
import com.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitExam(
            @RequestParam Long candidateId,
            @RequestParam int examId,
            @RequestBody List<MCQAnswers> mcqAnswers,
            @RequestBody List<ProgrammingAnswer> programmingAnswers) {

        answerService.submitExam(candidateId, examId, mcqAnswers, programmingAnswers);
        return ResponseEntity.ok("Exam submission successful.");
    }
}