package com.backend.service;

import com.backend.model.Candidate;
import com.backend.model.Exam;
import com.backend.model.ExamLog;
import com.backend.repository.CandidateRepository;
import com.backend.repository.ExamLogRepository;
import com.backend.repository.ExamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ExamLogService {
    @Autowired
    private ExamLogRepository examLogRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ExamRepository examRepository;

    public ExamLog logExamEvent(Long candidateId, int examId, int examFlag) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new EntityNotFoundException("Candidate not found: " + candidateId));

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found: " + examId));

        ExamLog log = new ExamLog();
        log.setCandidate(candidate);
        log.setExam(exam);
        log.setExamFlag(examFlag);
        log.setTimestamp(LocalDateTime.now());

        return examLogRepository.save(log);
    }

    public List<ExamLog> getExamLogs(Long candidateId, Integer examId) {
        return examLogRepository.findByCandidateAndExam(candidateId, examId);
    }

    public List<ExamLog> getExamLogsByExamId(Integer examId) {
        return examLogRepository.findByExam(examId);
    }
}