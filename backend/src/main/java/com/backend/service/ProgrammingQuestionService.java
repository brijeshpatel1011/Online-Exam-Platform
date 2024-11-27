package com.backend.service;

import com.backend.model.ProgrammingQuestion;
import com.backend.repository.ProgrammingQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgrammingQuestionService {

    @Autowired
    private ProgrammingQuestionRepository programmingQuestionRepository;

    // Save a new programming question
    public ProgrammingQuestion save(ProgrammingQuestion programmingQuestion) {
        return programmingQuestionRepository.save(programmingQuestion);
    }

    // Get all programming questions
    public List<ProgrammingQuestion> getAll() {
        return programmingQuestionRepository.findAll();
    }

    // Get a programming question by ID
    public ProgrammingQuestion getById(Long id) {
        return programmingQuestionRepository.findById(id).orElseThrow(() -> new RuntimeException("Programming Question not found."));
    }

    // Update a programming question
    public ProgrammingQuestion update(Long id, ProgrammingQuestion updatedQuestion) {
        Optional<ProgrammingQuestion> existingQuestionOpt = programmingQuestionRepository.findById(id);

        if (!existingQuestionOpt.isPresent()) {
            throw new RuntimeException("Programming Question not found.");
        }

        ProgrammingQuestion existingQuestion = existingQuestionOpt.get();
        existingQuestion.setTitle(updatedQuestion.getTitle());
        existingQuestion.setDescription(updatedQuestion.getDescription());
        existingQuestion.setInputFormat(updatedQuestion.getInputFormat());
        existingQuestion.setOutputFormat(updatedQuestion.getOutputFormat());
        existingQuestion.setConstraints(updatedQuestion.getConstraints());
        existingQuestion.setSampleInput(updatedQuestion.getSampleInput());
        existingQuestion.setSampleOutput(updatedQuestion.getSampleOutput());
        existingQuestion.setDifficulty(updatedQuestion.getDifficulty());
        existingQuestion.setMarks(updatedQuestion.getMarks());

        return programmingQuestionRepository.save(existingQuestion);
    }

    // Delete a programming question
    public void delete(Long id) {
        programmingQuestionRepository.deleteById(id);
    }
}
