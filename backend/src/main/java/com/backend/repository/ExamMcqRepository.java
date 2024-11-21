package com.backend.repository;

import com.backend.model.ExamMcq;
import com.backend.model.ExamMcqId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamMcqRepository extends JpaRepository<ExamMcq, ExamMcqId> {
}
