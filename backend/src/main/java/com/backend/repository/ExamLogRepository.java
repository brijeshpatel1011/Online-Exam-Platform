package com.backend.repository;

import com.backend.model.ExamLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamLogRepository extends JpaRepository<ExamLog, Long> {
    @Query("SELECT el FROM ExamLog el WHERE el.candidate.cId = :candidateId AND el.exam.examId = :examId")
    List<ExamLog> findByCandidateAndExam(@Param("candidateId") Long candidateId, @Param("examId") Integer examId);

    @Query("SELECT el FROM ExamLog el WHERE el.exam.examId = :examId")
    List<ExamLog> findByExam(@Param("examId") Integer examId);
}