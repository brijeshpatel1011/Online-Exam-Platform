package com.backend.service;

import com.backend.model.*;
import com.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private MCQAnswerRepository mcqAnswersRepository;

    @Autowired
    private ProgrammingAnswerRepository programmingAnswerRepository;

    @Autowired
    private MCQRepository mcqRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    public void submitExam(Long candidateId, int examId, List<MCQAnswers> mcqAnswers, List<ProgrammingAnswer> programmingAnswers) {
        int correctAnswers = 0;
        int totalQuestions = mcqAnswers.size() + programmingAnswers.size();

        for (MCQAnswers mcqAnswer : mcqAnswers) {
            MCQ question = mcqRepository.findById(mcqAnswer.getQuestion().getId())
                    .orElseThrow(() -> new RuntimeException("MCQ not found"));

            boolean isCorrect = question.getCorrectAnswer().equals(mcqAnswer.getSelectedOption());
            mcqAnswer.setIsCorrect(isCorrect);

            if (isCorrect) correctAnswers++;

            mcqAnswersRepository.save(mcqAnswer);
        }

        for (ProgrammingAnswer programmingAnswer : programmingAnswers) {
            programmingAnswerRepository.save(programmingAnswer);
        }

        // Save Exam Result
        ExamResult result = new ExamResult();
        result.setCandidate(new Candidate(candidateId));
        result.setExam(new Exam(examId));
        result.setTotalQuestions(totalQuestions);
        result.setCorrectAnswers(correctAnswers);

        examResultRepository.save(result);
    }
}