package com.backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ExamProgrammingQuestionKey implements Serializable {

    private Integer examId;

    private Long programmingQuestionId;
}
