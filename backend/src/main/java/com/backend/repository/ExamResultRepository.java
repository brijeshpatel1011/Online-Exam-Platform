package com.backend.repository;

import com.backend.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByExam_ExamId(Integer examId);

    @Query(value = "SELECT DISTINCT exam_id FROM exam_results", nativeQuery = true)
    List<Integer> findDistinctExamIds();

    List<ExamResult> findByExam_ExamIdAndCandidate_cId(Integer examId, Long candidateId);

}