package com.backend.repository;

import com.backend.model.Candidate;
import com.backend.model.Exam;
import com.backend.model.ProgrammingAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;

import java.util.List;

@Repository
public interface ProgrammingAnswerRepository extends JpaRepository<ProgrammingAnswer, Long> {
    List<ProgrammingAnswer> findByCandidateAndExam(Candidate candidate, Exam exam);

    List<ProgrammingAnswer> findByExam_ExamId(Integer examId);
    List<ProgrammingAnswer> findByExam_ExamIdAndCandidate_cId(Integer examId, Long candidateId);
}
