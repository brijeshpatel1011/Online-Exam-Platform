package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateProgrammingAnswersRepository extends JpaRepository<CandidateProgrammingAnswers, Long> {
}
