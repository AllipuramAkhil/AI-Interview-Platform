package com.akhil.interviewplatform.service;

import java.util.List;

import com.akhil.interviewplatform.entity.Result;

public interface ResultService {

    // =========================
    // SAVE RESULT
    // =========================

    Result saveResult(
            Result result
    );

    // =========================
    // GET ALL RESULTS
    // =========================

    List<Result> getAllResults();

    // =========================
    // GET RESULT BY ID
    // =========================

    Result getResultById(
            Long id
    );

    // =========================
    // DELETE RESULT
    // =========================

    String deleteResult(
            Long id
    );
}