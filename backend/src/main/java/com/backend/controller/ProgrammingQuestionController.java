package com.backend.controller;

import com.backend.model.ProgrammingQuestion;
import com.backend.service.ProgrammingQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programming-questions")
public class ProgrammingQuestionController {

    @Autowired
    private ProgrammingQuestionService programmingQuestionService;

    @PostMapping
    public ResponseEntity<ProgrammingQuestion> createProgrammingQuestion(@RequestBody ProgrammingQuestion programmingQuestion) {
        ProgrammingQuestion createdQuestion = programmingQuestionService.save(programmingQuestion);
        return ResponseEntity.ok(createdQuestion);
    }

    @GetMapping
    public ResponseEntity<List<ProgrammingQuestion>> getAllProgrammingQuestions() {
        List<ProgrammingQuestion> questions = programmingQuestionService.getAll();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgrammingQuestion> getProgrammingQuestionById(@PathVariable Long id) {
        ProgrammingQuestion question = programmingQuestionService.getById(id);
        return ResponseEntity.ok(question);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgrammingQuestion> updateProgrammingQuestion(@PathVariable Long id, @RequestBody ProgrammingQuestion programmingQuestion) {
        ProgrammingQuestion updatedQuestion = programmingQuestionService.update(id, programmingQuestion);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProgrammingQuestion(@PathVariable Long id) {
        programmingQuestionService.delete(id);
        return ResponseEntity.ok("Programming Question deleted successfully.");
    }
}
