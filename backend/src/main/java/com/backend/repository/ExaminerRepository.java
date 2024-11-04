package com.backend.repository;

import com.backend.model.Examiner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExaminerRepository extends JpaRepository<Examiner, Long> {
    Optional<Examiner> findByEmail(String email);
}
