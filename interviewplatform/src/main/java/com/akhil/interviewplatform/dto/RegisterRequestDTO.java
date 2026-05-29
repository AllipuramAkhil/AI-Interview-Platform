package com.akhil.interviewplatform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // =========================
    // ROLE
    // =========================

    private String role;

    // =========================
    // CONSTRUCTORS
    // =========================

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(

            String name,

            String email,

            String password,

            String role

    ) {

        this.name = name;

        this.email = email;

        this.password = password;

        this.role = role;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email =
                email.trim().toLowerCase();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }

    // =========================
    // ROLE GETTER/SETTER
    // =========================

    public String getRole() {
        return role;
    }

    public void setRole(
            String role
    ) {
        this.role = role;
    }
}