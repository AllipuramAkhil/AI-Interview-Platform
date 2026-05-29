package com.akhil.interviewplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.akhil.interviewplatform.entity.InterviewSession;

import com.akhil.interviewplatform.service.InterviewSessionService;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = {
        "http://localhost:*"
        
})
public class InterviewSessionController {

    @Autowired
    private InterviewSessionService sessionService;

    // =========================
    // CREATE INTERVIEW SESSION
    // =========================

    @PostMapping
    public InterviewSession createSession(
            @Valid
            @RequestBody
            InterviewSession session
    ) {

        return sessionService.createSession(
                session
        );
    }

    // =========================
    // GET ALL SESSIONS
    // =========================

    @GetMapping
    public List<InterviewSession> getAllSessions() {

        return sessionService.getAllSessions();
    }

    // =========================
    // GET SESSION BY ID
    // =========================

    @GetMapping("/{id}")
    public InterviewSession getSessionById(
            @PathVariable Long id
    ) {

        return sessionService.getSessionById(id);
    }

    // =========================
    // UPDATE SESSION
    // =========================

    @PutMapping("/{id}")
    public InterviewSession updateSession(
            @PathVariable Long id,

            @Valid
            @RequestBody
            InterviewSession session
    ) {

        return sessionService.updateSession(
                id,
                session
        );
    }

    // =========================
    // DELETE SESSION
    // =========================

    @DeleteMapping("/{id}")
    public String deleteSession(
            @PathVariable Long id
    ) {

        sessionService.deleteSession(id);

        return "Interview Session Deleted Successfully";
    }
}