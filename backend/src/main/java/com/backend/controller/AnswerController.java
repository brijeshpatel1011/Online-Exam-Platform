package com.backend.controller;

import com.backend.model.*;
import com.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    public static class ExamSubmissionRequest {
        private List<Map<String, Object>> mcqAnswers;
        private List<Map<String, Object>> programmingAnswers;

        public List<Map<String, Object>> getMcqAnswers() { return mcqAnswers != null ? mcqAnswers : new ArrayList<>(); }
        public void setMcqAnswers(List<Map<String, Object>> mcqAnswers) { this.mcqAnswers = mcqAnswers; }
        public List<Map<String, Object>> getProgrammingAnswers() { return programmingAnswers != null ? programmingAnswers : new ArrayList<>(); }
        public void setProgrammingAnswers(List<Map<String, Object>> programmingAnswers) { this.programmingAnswers = programmingAnswers; }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(
            @RequestParam Long candidateId,
            @RequestParam int examId,
            @RequestBody ExamSubmissionRequest request) {

        try {
            if (candidateId == null || candidateId <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "ERROR",
                        "message", "Invalid candidate ID"
                ));
            }
            if (examId <= 0) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "ERROR",
                        "message", "Invalid exam ID"
                ));
            }

            List<MCQAnswers> mcqAnswers = request.getMcqAnswers().stream()
                    .map(map -> {
                        MCQAnswers answer = new MCQAnswers();
                        MCQ mcq = new MCQ();

                        try {
                            Object questionObj = map.get("question");
                            Long mcqId;

                            if (questionObj instanceof Map) {
                                Map<String, Object> questionMap = (Map<String, Object>) questionObj;
                                Object idObj = questionMap.get("id");

                                if (idObj == null) {
                                    throw new IllegalArgumentException("MCQ ID is missing");
                                }

                                if (idObj instanceof Integer) {
                                    mcqId = ((Integer) idObj).longValue();
                                } else if (idObj instanceof Long) {
                                    mcqId = (Long) idObj;
                                } else if (idObj instanceof String) {
                                    mcqId = Long.parseLong((String) idObj);
                                } else {
                                    throw new IllegalArgumentException("Invalid MCQ ID format");
                                }
                            } else {
                                throw new IllegalArgumentException("Invalid question format in request");
                            }

                            mcq.setId(mcqId);
                            answer.setQuestion(mcq);

                            String selectedOption = (String) map.get("selectedOption");
                            if (selectedOption == null || selectedOption.trim().isEmpty()) {
                                throw new IllegalArgumentException("Selected option cannot be empty");
                            }
                            answer.setSelectedOption(selectedOption.trim());

                        } catch (NumberFormatException e) {
                            throw new IllegalArgumentException("Invalid MCQ ID format: " + e.getMessage());
                        } catch (Exception e) {
                            throw new IllegalArgumentException("Error processing MCQ answer: " + e.getMessage());
                        }

                        return answer;
                    })
                    .collect(Collectors.toList());

            List<ProgrammingAnswer> programmingAnswers = request.getProgrammingAnswers().stream()
                    .map(map -> {
                        ProgrammingAnswer answer = new ProgrammingAnswer();
                        ProgrammingQuestion question = new ProgrammingQuestion();

                        try {
                            Map<String, Object> questionMap = (Map<String, Object>) map.get("question");
                            if (questionMap != null && questionMap.get("id") != null) {
                                Object idObj = questionMap.get("id");
                                Long questionId;

                                if (idObj instanceof Integer) {
                                    questionId = ((Integer) idObj).longValue();
                                } else if (idObj instanceof Long) {
                                    questionId = (Long) idObj;
                                } else if (idObj instanceof String) {
                                    questionId = Long.parseLong((String) idObj);
                                } else {
                                    throw new IllegalArgumentException("Invalid programming question ID format");
                                }

                                question.setId(questionId);
                            } else {
                                throw new IllegalArgumentException("Invalid question ID in programming answer");
                            }

                            answer.setQuestion(question);
                            answer.setSolutionCode((String) map.get("solutionCode"));

                            if (answer.getSolutionCode() == null || answer.getSolutionCode().trim().isEmpty()) {
                                throw new IllegalArgumentException("Solution code cannot be empty");
                            }
                        } catch (Exception e) {
                            throw new IllegalArgumentException("Error processing programming answer: " + e.getMessage());
                        }

                        return answer;
                    })
                    .collect(Collectors.toList());

            ExamResult result = answerService.submitExam(candidateId, examId, mcqAnswers, programmingAnswers);

            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Exam submitted successfully",
                    "result", Map.of(
                            "resultId", result.getId(),
                            "totalScore", result.getTotalScore(),
                            "mcqScore", result.getMcqScore(),
                            "programmingScore", result.getProgrammingScore(),
                            "passed", result.getPassed(),
                            "submittedAt", result.getSubmittedAt()
                    )
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "ERROR",
                    "message", "Invalid input: " + e.getMessage()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "ERROR",
                    "message", "An error occurred while processing your submission: " + e.getMessage()
            ));
        }
    }
}