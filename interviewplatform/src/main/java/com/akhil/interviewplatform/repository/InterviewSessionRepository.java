package com.akhil.interviewplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akhil.interviewplatform.entity.InterviewSession;

public interface InterviewSessionRepository
        extends JpaRepository<InterviewSession, Long> {

    // =========================
    // FIND BY CATEGORY
    // =========================

    List<InterviewSession> findByCategory(
            String category
    );

    // =========================
    // FIND BY STATUS
    // =========================

    List<InterviewSession> findByStatus(
            String status
    );

    // =========================
    // FIND BY CANDIDATE NAME
    // =========================

    List<InterviewSession> findByCandidateNameContainingIgnoreCase(
            String candidateName
    );
}