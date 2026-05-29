package com.akhil.interviewplatform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // =========================
    // CONSTRUCTORS
    // =========================

    public LoginRequestDTO() {
    }

    public LoginRequestDTO(
            String email,
            String password
    ) {
        this.email = email;
        this.password = password;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email.trim().toLowerCase();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }
}