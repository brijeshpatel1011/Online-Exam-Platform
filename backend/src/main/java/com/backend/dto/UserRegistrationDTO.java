package com.backend.dto;

import lombok.Data;
import com.backend.entity.Role;

@Data
public class UserRegistrationDTO {
    private String username;
    private String email;
    private String password;
    private Role role;
}