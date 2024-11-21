package com.backend.repository;

import com.backend.model.MCQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MCQRepository extends JpaRepository<MCQ, Long> {
    @Query(value = "SELECT TOP(:count) * FROM mcq ORDER BY NEWID()", nativeQuery = true)
    List<MCQ> findRandomQuestions(@Param("count") int count);
}
