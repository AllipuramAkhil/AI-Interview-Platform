package com.akhil.interviewplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akhil.interviewplatform.entity.Result;

public interface ResultRepository
        extends JpaRepository<Result, Long> {

    // =========================
    // FIND BY CATEGORY
    // =========================

    List<Result> findByCategory(
            String category
    );

    // =========================
    // FIND BY STATUS
    // =========================

    List<Result> findByStatus(
            String status
    );

    // =========================
    // SEARCH BY CANDIDATE
    // =========================

    List<Result> findByCandidateNameContainingIgnoreCase(
            String candidateName
    );
}