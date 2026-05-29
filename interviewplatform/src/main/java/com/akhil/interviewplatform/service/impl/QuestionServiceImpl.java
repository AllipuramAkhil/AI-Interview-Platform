package com.akhil.interviewplatform.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akhil.interviewplatform.entity.Question;
import com.akhil.interviewplatform.repository.QuestionRepository;
import com.akhil.interviewplatform.service.QuestionService;

@Service
public class QuestionServiceImpl
        implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // =========================
    // ADD QUESTION
    // =========================
    @Override
    public Question addQuestion(
            Question question
    ) {
        return questionRepository.save(question);
    }

    // =========================
    // GET ALL QUESTIONS
    // =========================
    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // =========================
    // GET QUESTIONS BY CATEGORY
    // =========================
    @Override
    public List<Question> getQuestionsByCategory(
            String category
    ) {
        List<Question> questions =
                questionRepository.findByCategory(category);

        Collections.shuffle(questions);

        if (questions.size() > 10) {
            return questions.subList(0, 10);
        }

        return questions;
    }

    // =========================
    // GET QUESTION BY ID
    // =========================
    @Override
    public Question getQuestionById(
            Long id
    ) {
        return questionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Question not found"
                        )
                );
    }

    // =========================
    // UPDATE QUESTION
    // =========================
    @Override
    public Question updateQuestion(
            Long id,
            Question question
    ) {
        Question existingQuestion =
                getQuestionById(id);

        existingQuestion.setTitle(
                question.getTitle()
        );

        existingQuestion.setCategory(
                question.getCategory()
        );

        existingQuestion.setDifficulty(
                question.getDifficulty()
        );

        existingQuestion.setAnswer(
                question.getAnswer()
        );

        return questionRepository.save(
                existingQuestion
        );
    }

    // =========================
    // DELETE QUESTION
    // =========================
    @Override
    public void deleteQuestion(
            Long id
    ) {
        Question question =
                getQuestionById(id);

        questionRepository.delete(question);
    }
}