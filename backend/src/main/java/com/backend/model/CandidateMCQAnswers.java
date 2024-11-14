package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidate_mcq_answers")
public class CandidateMCQAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "candidate_exam_id")
    private CandidateExam candidateExam;

    @ManyToOne
    @JoinColumn(name = "mcq_id")
    private MCQ mcq;

    @Column(name = "selected_option")
    private String selectedOption;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
}

