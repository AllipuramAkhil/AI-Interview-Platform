package com.akhil.interviewplatform.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.akhil.interviewplatform.security.JwtAuthFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // =========================
    // AUTHENTICATION MANAGER
    // =========================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }

    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOriginPatterns(
                List.of(
                        "http://localhost:*"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setExposedHeaders(
                List.of("Authorization")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // =========================
    // SECURITY FILTER CHAIN
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =====================
                // ENABLE CORS
                // =====================

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                // =====================
                // DISABLE CSRF
                // =====================

                .csrf(csrf ->
                        csrf.disable()
                )

                // =====================
                // STATELESS SESSION
                // =====================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =====================
                // AUTHORIZATION
                // =====================

                .authorizeHttpRequests(auth -> auth

                        // =================
                        // PUBLIC USER APIs
                        // =================

                        .requestMatchers(

                                "/api/users/register",

                                "/api/users/login",

                                "/api/users/verify-otp",

                                "/api/users/resend-otp",

                                "/api/users/forgot-password",

                                "/api/users/reset-password"

                        ).permitAll()

                        // =================
                        // PUBLIC QUESTION FETCH
                        // =================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/questions/**"
                        ).permitAll()

                        // =================
                        // ADMIN APIs
                        // =================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/questions/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/questions/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/questions/**"
                        ).hasRole("ADMIN")

                        // =================
                        // INTERVIEW APIs
                        // =================

                        .requestMatchers(
                                "/api/interviews/**"
                        ).authenticated()

                        // =================
                        // RESULT APIs
                        // =================

                        .requestMatchers(
                                "/api/results/**"
                        ).authenticated()

                        // =================
                        // PREFLIGHT
                        // =================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // =================
                        // EVERYTHING ELSE
                        // =================

                        .anyRequest()
                        .authenticated()
                )

                // =====================
                // JWT FILTER
                // =====================

                .addFilterBefore(

                        jwtAuthFilter,

                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}