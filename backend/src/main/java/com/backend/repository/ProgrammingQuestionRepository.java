package com.backend.repository;

import com.backend.model.ProgrammingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgrammingQuestionRepository extends JpaRepository<ProgrammingQuestion, Long> {
}

