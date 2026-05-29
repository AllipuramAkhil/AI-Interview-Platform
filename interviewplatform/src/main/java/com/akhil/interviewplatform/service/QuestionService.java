package com.akhil.interviewplatform.service;

import java.util.List;

import com.akhil.interviewplatform.entity.Question;

public interface QuestionService {

    // =========================
    // ADD QUESTION
    // =========================
    Question addQuestion(
            Question question
    );

    // =========================
    // GET ALL QUESTIONS
    // =========================
    List<Question> getAllQuestions();

    // =========================
    // GET QUESTIONS BY CATEGORY
    // =========================
    List<Question> getQuestionsByCategory(
            String category
    );

    // =========================
    // GET QUESTION BY ID
    // =========================
    Question getQuestionById(
            Long id
    );

    // =========================
    // UPDATE QUESTION
    // =========================
    Question updateQuestion(
            Long id,
            Question question
    );

    // =========================
    // DELETE QUESTION
    // =========================
    void deleteQuestion(
            Long id
    );
}