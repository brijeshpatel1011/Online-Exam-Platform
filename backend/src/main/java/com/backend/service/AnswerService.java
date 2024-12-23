package com.backend.service;

import com.backend.model.*;
import com.backend.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class AnswerService {
    @Autowired
    private MCQRepository mcqRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private MCQAnswerRepository mcqAnswersRepository;

    @Autowired
    private ProgrammingAnswerRepository programmingAnswerRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ProgrammingQuestionRepository programmingQuestionRepository;

    public ExamResult submitExam(Long candidateId, int examId, List<MCQAnswers> mcqAnswers, List<ProgrammingAnswer> programmingAnswers) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new EntityNotFoundException("Candidate not found: " + candidateId));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found: " + examId));

        int mcqMarksObtained = 0;
        int totalMcqMarks = 0;
        int correctAnswersCount = 0;
        int totalProgrammingMarks = 0;
        double programmingScore = 0.0;

        if (mcqAnswers != null && !mcqAnswers.isEmpty()) {
            for (MCQAnswers answer : mcqAnswers) {
                MCQ question = mcqRepository.findById(answer.getQuestion().getId())
                        .orElseThrow(() -> new EntityNotFoundException("MCQ not found: " + answer.getQuestion().getId()));

                MCQAnswers newAnswer = new MCQAnswers();
                newAnswer.setCandidate(candidate);
                newAnswer.setExam(exam);
                newAnswer.setQuestion(question);
                newAnswer.setSelectedOption(answer.getSelectedOption());
                newAnswer.setSubmittedAt(new Date());

                boolean isCorrect = question.getCorrectAnswer() != null &&
                        answer.getSelectedOption() != null &&
                        answer.getSelectedOption().trim().equalsIgnoreCase(question.getCorrectAnswer().trim());

                newAnswer.setIsCorrect(isCorrect);
                mcqAnswersRepository.save(newAnswer);

                totalMcqMarks += question.getMarks();
                if (isCorrect) {
                    mcqMarksObtained += question.getMarks();
                    correctAnswersCount++;
                }
            }
        }

        double mcqScore = (totalMcqMarks > 0) ? ((double) mcqMarksObtained / totalMcqMarks) * 100.0 : 0.0;

        if (programmingAnswers != null && !programmingAnswers.isEmpty()) {
            for (ProgrammingAnswer answer : programmingAnswers) {
                ProgrammingQuestion question = programmingQuestionRepository.findById(answer.getQuestion().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Programming question not found: " + answer.getQuestion().getId()));

                ProgrammingAnswer newAnswer = new ProgrammingAnswer();
                newAnswer.setCandidate(candidate);
                newAnswer.setExam(exam);
                newAnswer.setQuestion(question);
                newAnswer.setSolutionCode(answer.getSolutionCode());
                newAnswer.setSubmittedAt(new Date());
                programmingAnswerRepository.save(newAnswer);

                totalProgrammingMarks += question.getMarks();
            }
        }

        int totalQuestions = (mcqAnswers != null ? mcqAnswers.size() : 0) +
                (programmingAnswers != null ? programmingAnswers.size() : 0);

        double totalScore;
        if (totalProgrammingMarks > 0) {
            totalScore = (mcqScore + programmingScore) / 2.0;
        } else {
            totalScore = mcqScore;
        }

        ExamResult result = new ExamResult();
        result.setCandidate(candidate);
        result.setExam(exam);
        result.setTotalQuestions(totalQuestions);
        result.setCorrectAnswers(correctAnswersCount);
        result.setMcqScore(mcqScore);
        result.setProgrammingScore(programmingScore);
        result.setTotalScore(totalScore);
        result.setPassed(totalScore >= exam.getPassingScore());
        result.setSubmittedAt(new Date());

        ExamResult savedResult = examResultRepository.save(result);

        System.out.println("Exam Submission Details:");
        System.out.println("Candidate ID: " + candidateId);
        System.out.println("Exam ID: " + examId);
        System.out.println("MCQ Score: " + mcqScore);
        System.out.println("Programming Score: " + programmingScore);
        System.out.println("Total Score: " + totalScore);
        System.out.println("Result ID: " + savedResult.getId());

        return savedResult;
    }
}