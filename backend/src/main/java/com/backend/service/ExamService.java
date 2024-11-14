package com.backend.service;

import com.backend.model.*;
import com.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CandidateExamRepository candidateExamRepository;

    @Autowired
    private MCQRepository mcqRepository;

    @Autowired
    private CandidateMCQAnswersRepository candidateMcqAnswerRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public CandidateExam startExam(Long candidateId, Long examId) {
        Optional<Candidate> candidateOpt = candidateRepository.findById(candidateId);
        Optional<Exam> examOpt = examRepository.findById(examId);

        if (candidateOpt.isPresent() && examOpt.isPresent()) {
            CandidateExam candidateExam = new CandidateExam();
            candidateExam.setCandidate(candidateOpt.get());
            candidateExam.setExam(examOpt.get());
            candidateExam.setStatus("in-progress");
            candidateExam.setStartedAt(LocalDateTime.now());
            return candidateExamRepository.save(candidateExam);
        }
        throw new RuntimeException("Invalid candidate or exam ID");
    }

    public CandidateMCQAnswers submitMcqAnswer(Long candidateExamId, Long mcqId, String selectedOption) {
        CandidateExam candidateExam = candidateExamRepository.findById(candidateExamId)
                .orElseThrow(() -> new RuntimeException("Candidate exam not found"));
        MCQ mcq = mcqRepository.findById(mcqId)
                .orElseThrow(() -> new RuntimeException("MCQ not found"));

        CandidateMCQAnswers answer = new CandidateMCQAnswers();
        answer.setCandidateExam(candidateExam);
        answer.setMcq(mcq);
        answer.setSelectedOption(selectedOption);
        answer.setSubmittedAt(LocalDateTime.now());
        return candidateMcqAnswerRepository.save(answer);
    }

    public int calculateExamScore(Long candidateExamId) {
        List<CandidateMCQAnswers> answers = candidateMcqAnswerRepository.findByCandidateExam_CandidateExamId(candidateExamId);
        int score = 0;

        for (CandidateMCQAnswers answer : answers) {
            if (answer.getSelectedOption().equals(answer.getMcq().getCorrectAnswer())) {
                score += answer.getMcq().getMarks();
            }
        }

        CandidateExam candidateExam = candidateExamRepository.findById(candidateExamId)
                .orElseThrow(() -> new RuntimeException("Candidate exam not found"));
        candidateExam.setScore(score);
        candidateExam.setStatus("completed");
        candidateExamRepository.save(candidateExam);

        return score;
    }

    public CandidateExam getCandidateExamResult(Long candidateExamId) {
        return candidateExamRepository.findById(candidateExamId)
                .orElseThrow(() -> new RuntimeException("Candidate exam not found"));
    }


    public Optional<CandidateExam> getExamStatusByExamId(Long examId) {
        return candidateExamRepository.findByExam_ExamId(examId);
    }

}