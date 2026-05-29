package com.akhil.interviewplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akhil.interviewplatform.entity.Question;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    // =========================
    // FIND BY CATEGORY
    // =========================

    List<Question> findByCategory(
            String category
    );

    // =========================
    // FIND BY DIFFICULTY
    // =========================

    List<Question> findByDifficulty(
            String difficulty
    );

    // =========================
    // SEARCH QUESTIONS
    // =========================

    List<Question> findByTitleContainingIgnoreCase(
            String title
    );
}