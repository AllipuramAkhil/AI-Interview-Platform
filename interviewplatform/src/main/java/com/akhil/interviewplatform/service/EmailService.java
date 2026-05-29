package com.akhil.interviewplatform.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // =========================
    // SEND OTP EMAIL
    // =========================

    public void sendOtpEmail(
            String toEmail,
            String otp
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setTo(toEmail);

            message.setSubject(
                    "AI Interview Platform - OTP Verification"
            );

            message.setText(

                    "Hello,\n\n"

                            + "Your OTP for verification is: "

                            + otp

                            + "\n\n"

                            + "This OTP is valid for verification only.\n\n"

                            + "AI Interview Platform"
            );

            mailSender.send(message);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to send OTP email"
            );
        }
    }
}