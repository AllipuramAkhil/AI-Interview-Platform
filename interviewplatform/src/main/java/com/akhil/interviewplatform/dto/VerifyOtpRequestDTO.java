package com.akhil.interviewplatform.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VerifyOtpRequestDTO {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "OTP is required")

    @Pattern(
            regexp = "^[0-9]{6}$",
            message = "OTP must be 6 digits"
    )

    private String otp;

    // =========================
    // CONSTRUCTORS
    // =========================

    public VerifyOtpRequestDTO() {
    }

    public VerifyOtpRequestDTO(
            String email,
            String otp
    ) {
        this.email = email;
        this.otp = otp;
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

    public String getOtp() {
        return otp;
    }

    public void setOtp(
            String otp
    ) {
        this.otp = otp.trim();
    }
}