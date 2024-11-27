package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ProgrammingQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String inputFormat;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String outputFormat;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sampleInput;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sampleOutput;

    @Column(nullable = false, length = 50)
    private String difficulty;

    @Column(nullable = false)
    private Integer marks=5;
}
