package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "programming_question")
public class ProgrammingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pqId;

    @Column(name = "question_text")
    private String questionText;

    @Column(name = "reference_answer")
    private String referenceAnswer;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "category")
    private String category;
}

