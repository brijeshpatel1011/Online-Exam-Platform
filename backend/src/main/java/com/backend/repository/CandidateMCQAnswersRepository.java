package com.backend.repository;

import com.backend.model.CandidateMCQAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateMCQAnswersRepository extends JpaRepository<CandidateMCQAnswers, Long> {
    List<CandidateMCQAnswers> findByCandidateExam_CandidateExamId(Long candidateExamId);
}
