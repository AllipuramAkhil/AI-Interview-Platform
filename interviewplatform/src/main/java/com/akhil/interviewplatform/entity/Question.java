package com.akhil.interviewplatform.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "questions")
public class Question {

    // =========================
    // PRIMARY KEY
    // =========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // FIELDS
    // =========================

    @NotBlank(message = "Question title is required")
    @Column(nullable = false, length = 1000)
    private String title;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @NotBlank(message = "Answer is required")
    @Column(length = 3000)
    private String answer;

    // =========================
    // CONSTRUCTORS
    // =========================

    public Question() {
    }

    public Question(
            Long id,
            String title,
            String category,
            String difficulty,
            String answer
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.difficulty = difficulty;
        this.answer = answer;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title
    ) {
        this.title = title.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category.trim();
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(
            String difficulty
    ) {
        this.difficulty = difficulty.trim();
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(
            String answer
    ) {
        this.answer = answer.trim();
    }
}