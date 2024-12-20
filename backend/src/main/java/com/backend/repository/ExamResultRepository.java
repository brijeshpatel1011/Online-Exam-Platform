package com.backend.repository;

import com.backend.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;


@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {}
