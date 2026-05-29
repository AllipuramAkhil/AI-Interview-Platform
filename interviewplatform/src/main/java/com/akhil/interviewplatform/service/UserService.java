package com.akhil.interviewplatform.service;

import com.akhil.interviewplatform.dto.LoginRequestDTO;
import com.akhil.interviewplatform.dto.LoginResponseDTO;
import com.akhil.interviewplatform.dto.RegisterRequestDTO;
import com.akhil.interviewplatform.dto.UserResponseDTO;
import com.akhil.interviewplatform.dto.VerifyOtpRequestDTO;

public interface UserService {

    // =========================
    // REGISTER USER
    // =========================

    UserResponseDTO registerUser(
            RegisterRequestDTO request
    );

    // =========================
    // LOGIN USER
    // =========================

    LoginResponseDTO loginUser(
            LoginRequestDTO request
    );

    // =========================
    // VERIFY OTP
    // =========================

    String verifyOtp(
            VerifyOtpRequestDTO request
    );

    // =========================
    // RESEND OTP
    // =========================

    String resendOtp(
            String email
    );
}