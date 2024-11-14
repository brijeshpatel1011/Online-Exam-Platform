package com.backend.repository;

import com.backend.model.CandidateExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateExamRepository extends JpaRepository<CandidateExam, Long> {
    Optional<CandidateExam> findByExam_ExamId(Long examId);

}

