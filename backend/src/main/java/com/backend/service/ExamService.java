package com.backend.service;

import com.backend.model.*;
import com.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
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
            candidateExam.setStartedAt(LocalDateTime.now());  // Updated to LocalDateTime
            return candidateExamRepository.save(candidateExam);
        }
        throw new RuntimeException("Invalid candidate or exam ID");
    }
}