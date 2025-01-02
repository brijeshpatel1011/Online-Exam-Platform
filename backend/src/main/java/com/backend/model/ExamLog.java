package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_log")
@Data
public class ExamLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examLogId;

    private int examFlag; // 1: Started, 2: In Progress, 3: Submitted, 4: Terminated

    @Column(columnDefinition = "DATETIME2(6)")
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}