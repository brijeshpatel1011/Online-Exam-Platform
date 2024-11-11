package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    @Column(name = "exam_name")
    private String examName;

    @Column(name = "exam_type")
    private String examType;

    @Column(name = "total_marks")
    private int totalMarks;

    @Column(name = "passing_marks")
    private int passingMarks;

    @Column(name = "duration_minutes")
    private int durationMinutes;

    @ManyToOne
    @JoinColumn(name = "examiner_id")
    private Examiner examiner;
}

