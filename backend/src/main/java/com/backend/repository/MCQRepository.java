package com.backend.repository;

import com.backend.model.MCQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MCQRepository extends JpaRepository<MCQ, Long> {
}
