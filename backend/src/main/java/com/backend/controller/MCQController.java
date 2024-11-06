package com.backend.controller;

import com.backend.model.MCQ;
import com.backend.service.MCQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mcq")
public class MCQController {

    @Autowired
    private MCQService mcqService;

    @PostMapping("/add")
    public ResponseEntity<MCQ> addMCQ(@RequestBody MCQ mcq) {
        MCQ savedMCQ = mcqService.addMCQ(mcq);
        return ResponseEntity.ok(savedMCQ);
    }

    @GetMapping("/")
    public ResponseEntity<List<MCQ>> getAllMCQs() {
        List<MCQ> mcqs = mcqService.getAllMCQs();
        return ResponseEntity.ok(mcqs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MCQ> getMCQById(@PathVariable Long id) {
        MCQ mcq = mcqService.getMCQById(id)
                .orElseThrow(() -> new IllegalArgumentException("MCQ not found"));
        return ResponseEntity.ok(mcq);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MCQ> updateMCQ(@PathVariable Long id, @RequestBody MCQ mcqDetails) {
        MCQ updatedMCQ = mcqService.updateMCQ(id, mcqDetails);
        return ResponseEntity.ok(updatedMCQ);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMCQ(@PathVariable Long id) {
        mcqService.deleteMCQ(id);
        return ResponseEntity.noContent().build();
    }
}
