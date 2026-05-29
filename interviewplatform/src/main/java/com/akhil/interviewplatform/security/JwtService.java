package com.akhil.interviewplatform.security;

import java.security.Key;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // =========================
    // SECRET KEY
    // =========================

    private static final String SECRET_KEY =
            "AkhilInterviewPlatformJwtSecretKey2026VerySecureKey";

    // =========================
    // GENERATE JWT TOKEN
    // =========================

    public String generateToken(
            String email
    ) {

        Key key = Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // =========================
    // EXTRACT EMAIL
    // =========================

    public String extractEmail(
            String token
    ) {

        return extractClaims(token)
                .getSubject();
    }

    // =========================
    // VALIDATE TOKEN
    // =========================

    public boolean validateToken(
            String token
    ) {

        try {

            extractClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    // =========================
    // EXTRACT CLAIMS
    // =========================

    private Claims extractClaims(
            String token
    ) {

        Key key = Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }
}