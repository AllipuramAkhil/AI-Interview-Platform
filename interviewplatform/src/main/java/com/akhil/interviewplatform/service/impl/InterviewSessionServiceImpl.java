package com.akhil.interviewplatform.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.akhil.interviewplatform.entity.InterviewSession;

import com.akhil.interviewplatform.repository.InterviewSessionRepository;

import com.akhil.interviewplatform.service.InterviewSessionService;

@Service
public class InterviewSessionServiceImpl
        implements InterviewSessionService {

    @Autowired
    private InterviewSessionRepository sessionRepository;

    // =========================
    // CREATE SESSION
    // =========================

    @Override
    public InterviewSession createSession(
            InterviewSession session
    ) {

        return sessionRepository.save(session);
    }

    // =========================
    // GET ALL SESSIONS
    // =========================

    @Override
    public List<InterviewSession> getAllSessions() {

        return sessionRepository.findAll();
    }

    // =========================
    // GET SESSION BY ID
    // =========================

    @Override
    public InterviewSession getSessionById(
            Long id
    ) {

        return sessionRepository.findById(id)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Interview session not found"
                        )
                );
    }

    // =========================
    // UPDATE SESSION
    // =========================

    @Override
    public InterviewSession updateSession(
            Long id,
            InterviewSession session
    ) {

        InterviewSession existingSession =
                getSessionById(id);

        existingSession.setCandidateName(
                session.getCandidateName()
        );

        existingSession.setCategory(
                session.getCategory()
        );

        existingSession.setStatus(
                session.getStatus()
        );

        existingSession.setStartTime(
                session.getStartTime()
        );

        existingSession.setEndTime(
                session.getEndTime()
        );

        return sessionRepository.save(
                existingSession
        );
    }

    // =========================
    // DELETE SESSION
    // =========================

    @Override
    public void deleteSession(
            Long id
    ) {

        InterviewSession session =
                getSessionById(id);

        sessionRepository.delete(session);
    }
}