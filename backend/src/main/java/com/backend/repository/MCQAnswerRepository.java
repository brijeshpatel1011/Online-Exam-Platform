package com.backend.repository;

import com.backend.model.Candidate;
import com.backend.model.Exam;
import com.backend.model.MCQAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MCQAnswerRepository extends JpaRepository<MCQAnswers, Long> {
    List<MCQAnswers> findByCandidateAndExam(Candidate candidate, Exam exam);
}

