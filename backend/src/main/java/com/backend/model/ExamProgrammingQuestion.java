package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exam_programming_question")
public class ExamProgrammingQuestion {

    @EmbeddedId
    private ExamProgrammingQuestionKey id;

    @ManyToOne
    @MapsId("examId")
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @ManyToOne
    @MapsId("programmingQuestionId")
    @JoinColumn(name = "programming_question_id")
    private ProgrammingQuestion programmingQuestion;
}
