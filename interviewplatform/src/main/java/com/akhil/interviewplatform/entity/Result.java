package com.akhil.interviewplatform.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "results")
public class Result {

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

    @Min(value = 0, message = "Minimum score is 0")
    @Max(value = 100, message = "Maximum score is 100")
    private int score;

    @Column(length = 3000)
    private String feedback;

    @NotBlank(message = "Status is required")
    private String status;

    // =========================
    // CONSTRUCTORS
    // =========================

    public Result() {
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

    public int getScore() {
        return score;
    }

    public void setScore(
            int score
    ) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(
            String feedback
    ) {
        this.feedback = feedback;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status.trim();
    }
}