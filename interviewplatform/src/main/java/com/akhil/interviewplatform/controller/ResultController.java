package com.akhil.interviewplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.akhil.interviewplatform.entity.Result;

import com.akhil.interviewplatform.service.ResultService;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class ResultController {

    @Autowired
    private ResultService resultService;

    // =========================
    // SAVE RESULT
    // =========================

    @PostMapping
    public Result saveResult(
            @Valid
            @RequestBody
            Result result
    ) {

        return resultService.saveResult(
                result
        );
    }

    // =========================
    // GET ALL RESULTS
    // =========================

    @GetMapping
    public List<Result> getAllResults() {

        return resultService.getAllResults();
    }

    // =========================
    // GET RESULT BY ID
    // =========================

    @GetMapping("/{id}")
    public Result getResultById(
            @PathVariable Long id
    ) {

        return resultService.getResultById(id);
    }

    // =========================
    // DELETE RESULT
    // =========================

    @DeleteMapping("/{id}")
    public String deleteResult(
            @PathVariable Long id
    ) {

        resultService.deleteResult(id);

        return "Result Deleted Successfully";
    }
}