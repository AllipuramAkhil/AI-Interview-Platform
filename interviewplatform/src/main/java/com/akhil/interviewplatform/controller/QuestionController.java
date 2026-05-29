package com.akhil.interviewplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.akhil.interviewplatform.entity.Question;
import com.akhil.interviewplatform.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // =========================
    // ADD QUESTION
    // =========================
    @PostMapping
    public Question addQuestion(
            @Valid
            @RequestBody
            Question question
    ) {
        return questionService.addQuestion(
                question
        );
    }

    // =========================
    // GET ALL QUESTIONS
    // =========================
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // =========================
    // GET QUESTIONS BY CATEGORY
    // =========================
    @GetMapping("/category/{category}")
    public List<Question> getQuestionsByCategory(
            @PathVariable String category
    ) {
    	 System.out.println(category);
        return questionService
                .getQuestionsByCategory(category);
    }

    // =========================
    // GET QUESTION BY ID
    // =========================
    @GetMapping("/{id}")
    public Question getQuestionById(
            @PathVariable Long id
    ) {
        return questionService.getQuestionById(id);
    }

    // =========================
    // UPDATE QUESTION
    // =========================
    @PutMapping("/{id}")
    public Question updateQuestion(
            @PathVariable Long id,

            @Valid
            @RequestBody
            Question question
    ) {
        return questionService.updateQuestion(
                id,
                question
        );
    }

    // =========================
    // DELETE QUESTION
    // =========================
    @DeleteMapping("/{id}")
    public String deleteQuestion(
            @PathVariable Long id
    ) {
        questionService.deleteQuestion(id);

        return "Question Deleted Successfully";
    }
}