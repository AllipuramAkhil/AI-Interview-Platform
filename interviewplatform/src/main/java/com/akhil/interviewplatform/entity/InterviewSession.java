package com.akhil.interviewplatform.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
public class InterviewSession {

    // =========================
    // PRIMARY KEY
    // =========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // FIELDS
    // =========================

    @NotBlank(message = "Candidate name is required")
    private String candidateName;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Status is required")
    private String status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    // =========================
    // CONSTRUCTORS
    // =========================

    public InterviewSession() {
    }

    public InterviewSession(
            Long id,
            String candidateName,
            String category,
            String status,
            LocalDateTime startTime,
            LocalDateTime endTime
    ) {
        this.id = id;
        this.candidateName = candidateName;
        this.category = category;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(
            String candidateName
    ) {
        this.candidateName = candidateName.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status.trim();
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(
            LocalDateTime startTime
    ) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(
            LocalDateTime endTime
    ) {
        this.endTime = endTime;
    }
}