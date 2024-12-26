package com.backend.controller;

import com.backend.model.*;
import com.backend.service.AnswerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(
            @RequestParam Long candidateId,
            @RequestParam int examId,
            @RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> mcqAnswersRaw = (List<Map<String, Object>>) request.get("mcqAnswers");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> programmingAnswersRaw = (List<Map<String, Object>>) request.get("programmingAnswers");

            Candidate candidate = new Candidate();
            candidate.setCId(candidateId);

            Exam exam = new Exam();
            exam.setExamId(examId);

            List<MCQAnswers> mcqAnswers = mcqAnswersRaw.stream()
                    .map(map -> {
                        MCQAnswers answer = new MCQAnswers();
                        MCQ mcq = new MCQ();
                        mcq.setId(Long.valueOf(((Map<?, ?>) map.get("question")).get("id").toString()));
                        answer.setQuestion(mcq);
                        answer.setSelectedOption((String) map.get("selectedOption"));
                        answer.setCandidate(candidate);
                        answer.setExam(exam);
                        answer.setSubmittedAt(new Date());
                        return answer;
                    })
                    .collect(Collectors.toList());

            List<ProgrammingAnswer> programmingAnswers = programmingAnswersRaw.stream()
                    .map(map -> {
                        ProgrammingAnswer answer = new ProgrammingAnswer();
                        ProgrammingQuestion question = new ProgrammingQuestion();
                        question.setId(Long.valueOf(((Map<?, ?>) map.get("question")).get("id").toString()));
                        answer.setQuestion(question);
                        answer.setSolutionCode((String) map.get("solutionCode"));
                        answer.setCandidate(candidate);
                        answer.setExam(exam);
                        answer.setSubmittedAt(new Date());
                        return answer;
                    })
                    .collect(Collectors.toList());

            ExamResult result = answerService.submitExam(candidateId, examId, mcqAnswers, programmingAnswers);

            return ResponseEntity.ok(Map.of(
                    "message", "Exam submission successful",
                    "mcqScore", result.getMcqScore(),
                    "totalScore", result.getTotalScore(),
                    "correctAnswers", result.getCorrectAnswers()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error processing submission: " + e.getMessage());
        }
    }
}