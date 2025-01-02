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

    @Autowired
    private ExamLogService examLogService;

    public ExamResult submitExam(Long candidateId, int examId, List<MCQAnswers> mcqAnswers, List<ProgrammingAnswer> programmingAnswers) {

        examLogService.logExamEvent(candidateId, examId, 3);

        try {


            Candidate candidate = candidateRepository.findById(candidateId)
                    .orElseThrow(() -> new EntityNotFoundException("Candidate not found: " + candidateId));

            Exam exam = examRepository.findById(examId)
                    .orElseThrow(() -> new EntityNotFoundException("Exam not found: " + examId));

            int correctMcqCount = 0;
            int totalMcqQuestions = mcqAnswers != null ? mcqAnswers.size() : 0;

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

                    if (isCorrect) {
                        correctMcqCount++;
                    }
                }
            }

            double mcqScore = correctMcqCount;

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
                }
            }

            double totalScore = mcqScore;

            ExamResult result = new ExamResult();
            result.setCandidate(candidate);
            result.setExam(exam);
            result.setTotalQuestions(totalMcqQuestions + (programmingAnswers != null ? programmingAnswers.size() : 0));
            result.setCorrectAnswers(correctMcqCount);
            result.setMcqScore(correctMcqCount);
            result.setProgrammingScore(0.0);
            result.setTotalScore(totalScore);
            result.setPassed(totalScore >= exam.getPassingScore());
            result.setSubmittedAt(new Date());

            ExamResult savedResult = examResultRepository.save(result);

            System.out.println("Exam Submission Details:");
            System.out.println("Candidate ID: " + candidateId);
            System.out.println("Exam ID: " + examId);
            System.out.println("Total MCQ Questions: " + totalMcqQuestions);
            System.out.println("Correct MCQ Answers: " + correctMcqCount);
            System.out.println("MCQ Score: " + mcqScore);
            System.out.println("Total Score: " + totalScore);
            System.out.println("Result ID: " + savedResult.getId());

            if (savedResult.getPassed()) {
                examLogService.logExamEvent(candidateId, examId, 5);
            } else {
                examLogService.logExamEvent(candidateId, examId, 6);
            }

            return savedResult;
        }catch (Exception e) {
            examLogService.logExamEvent(candidateId, examId, 4);
            throw e;
        }
    }
}