package com.akhil.interviewplatform.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akhil.interviewplatform.entity.User;

public interface UserRepository
        extends JpaRepository<User, Long> {

    // =========================
    // FIND USER BY EMAIL
    // =========================

    Optional<User> findByEmail(
            String email
    );

    // =========================
    // CHECK EMAIL EXISTS
    // =========================

    boolean existsByEmail(
            String email
    );
}