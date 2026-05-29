package com.akhil.interviewplatform.dto;

public class LoginResponseDTO {

    private String message;

    private String email;

    private String role;

    private String token;

    // =========================
    // CONSTRUCTORS
    // =========================

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(
            String message,
            String email,
            String role,
            String token
    ) {
        this.message = message;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message
    ) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(
            String role
    ) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(
            String token
    ) {
        this.token = token;
    }
}