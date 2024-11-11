package com.backend.repository;

import com.backend.model.ExamQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamQuestionsRepository extends JpaRepository<ExamQuestions, Long> {
}
