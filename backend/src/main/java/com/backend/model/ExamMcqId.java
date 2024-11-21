package com.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ExamMcqId implements Serializable {

    @Column(name = "exam_id")
    private Integer examId;

    @Column(name = "mcq_id")
    private Long mcqId;
}
