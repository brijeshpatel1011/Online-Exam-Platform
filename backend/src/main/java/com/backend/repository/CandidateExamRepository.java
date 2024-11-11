package com.backend.repository;

import com.backend.model.CandidateExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateExamRepository extends JpaRepository<CandidateExam, Long> {
}

