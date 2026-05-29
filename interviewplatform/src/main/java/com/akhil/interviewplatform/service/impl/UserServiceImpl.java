package com.akhil.interviewplatform.service.impl;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.akhil.interviewplatform.dto.LoginRequestDTO;
import com.akhil.interviewplatform.dto.LoginResponseDTO;
import com.akhil.interviewplatform.dto.RegisterRequestDTO;
import com.akhil.interviewplatform.dto.UserResponseDTO;
import com.akhil.interviewplatform.dto.VerifyOtpRequestDTO;
import com.akhil.interviewplatform.entity.User;
import com.akhil.interviewplatform.repository.UserRepository;
import com.akhil.interviewplatform.security.JwtService;
import com.akhil.interviewplatform.service.EmailService;
import com.akhil.interviewplatform.service.UserService;

@Service
public class UserServiceImpl
        implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JavaMailSender mailSender;

    // =========================
    // REGISTER USER
    // =========================

    @Override
    public UserResponseDTO registerUser(
            RegisterRequestDTO request
    ) {

        boolean emailExists =
                userRepository.existsByEmail(
                        request.getEmail()
                );

        if (emailExists) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // SAVE ROLE
        user.setRole(
                request.getRole()
        );

        // GENERATE OTP

        String otp = String.format(
                "%06d",
                new Random().nextInt(999999)
        );

        user.setOtp(otp);

        user.setVerified(false);

        // SAVE USER

        User savedUser =
                userRepository.save(user);

        // SEND OTP EMAIL

        emailService.sendOtpEmail(
                savedUser.getEmail(),
                otp
        );

        return new UserResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    // =========================
    // LOGIN USER
    // =========================

    @Override
    public LoginResponseDTO loginUser(
            LoginRequestDTO request
    ) {

        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (optionalUser.isEmpty()) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        User user =
                optionalUser.get();

        // VERIFY OTP FIRST

        if (!user.isVerified()) {

            throw new RuntimeException(
                    "Please verify OTP first"
            );
        }

        // PASSWORD CHECK

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        // GENERATE JWT

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return new LoginResponseDTO(
                "Login Successful",
                user.getEmail(),
                user.getRole(),
                token
        );
    }

    // =========================
    // VERIFY OTP
    // =========================

    @Override
    public String verifyOtp(
            VerifyOtpRequestDTO request
    ) {

        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (optionalUser.isEmpty()) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        User user =
                optionalUser.get();

        if (
                user.getOtp() != null
                        &&
                        user.getOtp().equals(
                                request.getOtp()
                        )
        ) {

            user.setVerified(true);

            user.setOtp(null);

            userRepository.save(user);

            return "OTP Verified Successfully";
        }

        throw new RuntimeException(
                "Invalid OTP"
        );
    }

    // =========================
    // RESEND OTP
    // =========================

    @Override
    public String resendOtp(

            String email

    ) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User Not Found"
                                )
                        );

        // GENERATE NEW OTP

        String otp = String.valueOf(

                (int) (
                        Math.random()
                                * 900000
                ) + 100000
        );

        user.setOtp(otp);

        userRepository.save(user);

        // SEND EMAIL

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "New OTP - AI Interview Platform"
        );

        message.setText(

                "Your new OTP is: "
                        + otp
        );

        mailSender.send(message);

        return "OTP Resent Successfully";
    }
}