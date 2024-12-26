package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exam_results")
public class ExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(nullable = false)
    private Integer totalQuestions;

    @Column(nullable = false)
    private Integer correctAnswers;

    @Column(nullable = false)
    private int mcqScore;

    @Column(nullable = false)
    private Double programmingScore;

    @Column(nullable = false)
    private Double totalScore;

    @Column(nullable = false)
    private Boolean passed;

    @Column(name = "submitted_at", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;
}