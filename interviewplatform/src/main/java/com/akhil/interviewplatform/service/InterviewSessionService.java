package com.akhil.interviewplatform.service;

import java.util.List;

import com.akhil.interviewplatform.entity.InterviewSession;

public interface InterviewSessionService {

    // =========================
    // CREATE SESSION
    // =========================

    InterviewSession createSession(
            InterviewSession session
    );

    // =========================
    // GET ALL SESSIONS
    // =========================

    List<InterviewSession> getAllSessions();

    // =========================
    // GET SESSION BY ID
    // =========================

    InterviewSession getSessionById(
            Long id
    );

    // =========================
    // UPDATE SESSION
    // =========================

    InterviewSession updateSession(
            Long id,
            InterviewSession session
    );

    // =========================
    // DELETE SESSION
    // =========================

    void deleteSession(
            Long id
    );
}