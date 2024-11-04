package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Examiner")
public class Examiner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eId;
    private String name;
    private String email;
    private String phone;
    private String password;

    // Getters and Setters
}