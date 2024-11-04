package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cId;
    private String name;
    private String college;
    @Column(unique = true)
    private String email;
    private String phone;
    private Date birthdate;
    private String password;

    // Getters and Setters
}
