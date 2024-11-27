package com.backend.repository;

import com.backend.model.ProgrammingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgrammingQuestionRepository extends JpaRepository<ProgrammingQuestion, Long> {

    // Fetch random programming questions
    @Query(value = "SELECT * FROM programming_question ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT :count ROWS ONLY", nativeQuery = true)
    List<ProgrammingQuestion> findRandomProgrammingQuestions(@Param("count") int count);
}
