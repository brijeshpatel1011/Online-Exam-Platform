package com.backend.repository;

import com.backend.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
    List<Exam> findByCollege(String college);       // Find exams by college
    List<Exam> findByExamStartDateBetween(LocalDate startDate, LocalDate endDate);
}
