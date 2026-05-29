package com.akhil.interviewplatform.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.akhil.interviewplatform.config.ResetOtpStore;
import com.akhil.interviewplatform.dto.LoginRequestDTO;
import com.akhil.interviewplatform.dto.LoginResponseDTO;
import com.akhil.interviewplatform.dto.RegisterRequestDTO;
import com.akhil.interviewplatform.dto.UserResponseDTO;
import com.akhil.interviewplatform.dto.VerifyOtpRequestDTO;
import com.akhil.interviewplatform.entity.User;
import com.akhil.interviewplatform.repository.UserRepository;
import com.akhil.interviewplatform.service.EmailService;
import com.akhil.interviewplatform.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================
    // REGISTER USER
    // =========================

    @PostMapping("/register")
    public UserResponseDTO registerUser(
            @Valid
            @RequestBody
            RegisterRequestDTO request
    ) {
        return userService.registerUser(request);
    }

    // =========================
    // LOGIN USER
    // =========================

    @PostMapping("/login")
    public LoginResponseDTO loginUser(
            @Valid
            @RequestBody
            LoginRequestDTO request
    ) {
        return userService.loginUser(request);
    }

    // =========================
    // VERIFY OTP
    // =========================

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody
            VerifyOtpRequestDTO request
    ) {
        return userService.verifyOtp(request);
    }

    // =========================
    // RESEND OTP
    // =========================

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(

            @RequestBody
            Map<String, String> request

    ) {

        String email =
                request.get("email");

        return ResponseEntity.ok(

                userService.resendOtp(
                        email
                )
        );
    }

    // =========================
    // FORGOT PASSWORD
    // =========================

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody Map<String, String> request
    ) {

        String email = request.get("email");

        Optional<User> user =
                userRepository.findByEmail(email);

        if (user.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email not found");
        }

        String otp = String.valueOf(
                (int) (Math.random() * 900000) + 100000
        );

        ResetOtpStore.resetOtpMap.put(
                email,
                otp
        );

        emailService.sendOtpEmail(
                email,
                otp
        );

        return ResponseEntity.ok(
                "Reset OTP sent successfully"
        );
    }

    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody Map<String, String> request
    ) {

        String email =
                request.get("email");

        String otp =
                request.get("otp");

        String newPassword =
                request.get("newPassword");

        String storedOtp =
                ResetOtpStore.resetOtpMap.get(email);

        if (storedOtp == null ||
                !storedOtp.equals(otp)) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid OTP");
        }

        Optional<User> optionalUser =
                userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("User not found");
        }

        User user = optionalUser.get();

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        ResetOtpStore.resetOtpMap.remove(email);

        return ResponseEntity.ok(
                "Password reset successful"
        );
    }

    // =========================
    // PROTECTED PROFILE API
    // =========================

    @GetMapping("/profile")
    public String getProfile() {
        return "This is a protected profile API";
    }
}