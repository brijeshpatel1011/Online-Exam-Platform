package com.backend.repository;

import com.backend.model.ExamProgrammingQuestion;
import com.backend.model.ExamProgrammingQuestionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamProgrammingQuestionRepository extends JpaRepository<ExamProgrammingQuestion, ExamProgrammingQuestionKey> {
}
