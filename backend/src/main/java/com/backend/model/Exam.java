package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Exam")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private int examId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions;

    @Column(name = "passing_score")
    private Integer passingScore;

    @Column(name = "college", length = 200)
    private String college;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "exam_start_date")
    private LocalDate examStartDate;

    @Column(name = "exam_start_time")
    private LocalTime examStartTime;

    @Column(name = "exam_end_date")
    private LocalDate examEndDate;

    @Column(name = "exam_end_time")
    private LocalTime examEndTime;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @ManyToMany
    @JoinTable(
            name = "exam_mcq",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "mcq_id")
    )
    private List<MCQ> mcqs = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "exam_programming_question",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "programming_question_id")
    )
    private List<ProgrammingQuestion> programmingQuestions;

    public Exam(int examId) {
        this.examId = examId;
    }
}


