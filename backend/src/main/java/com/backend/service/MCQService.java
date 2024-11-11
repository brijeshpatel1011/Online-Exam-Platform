package com.backend.service;

import com.backend.model.MCQ;
import com.backend.repository.MCQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MCQService {

    @Autowired
    private MCQRepository mcqRepository;

    public MCQ addMCQ(MCQ mcq) {
        return mcqRepository.save(mcq);
    }

    public List<MCQ> getAllMCQs() {
        return mcqRepository.findAll();
    }

    public Optional<MCQ> getMCQById(Long id) {
        return mcqRepository.findById(id);
    }

    public MCQ updateMCQ(Long id, MCQ mcqDetails) {
        MCQ existingMCQ = mcqRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MCQ not found"));

        existingMCQ.setQuestion(mcqDetails.getQuestion());
        existingMCQ.setOptionA(mcqDetails.getOptionA());
        existingMCQ.setOptionB(mcqDetails.getOptionB());
        existingMCQ.setOptionC(mcqDetails.getOptionC());
        existingMCQ.setOptionD(mcqDetails.getOptionD());
        existingMCQ.setCorrectAnswer(mcqDetails.getCorrectAnswer());
        existingMCQ.setCategory(mcqDetails.getCategory());
        existingMCQ.setDifficulty(mcqDetails.getDifficulty());
        existingMCQ.setMarks(mcqDetails.getMarks());

        return mcqRepository.save(existingMCQ);
    }

    public void deleteMCQ(Long id) {
        MCQ mcq = mcqRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MCQ not found"));
        mcqRepository.delete(mcq);
    }
}
