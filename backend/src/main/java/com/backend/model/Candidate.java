package com.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String college;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Temporal(TemporalType.DATE)
    private Date birthdate;

    private String password;

    public Candidate(Long cId) {
        this.cId = cId;
    }}

