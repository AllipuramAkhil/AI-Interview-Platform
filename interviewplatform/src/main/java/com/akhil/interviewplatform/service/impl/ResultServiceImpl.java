package com.akhil.interviewplatform.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.akhil.interviewplatform.entity.Result;

import com.akhil.interviewplatform.repository.ResultRepository;

import com.akhil.interviewplatform.service.ResultService;

@Service
public class ResultServiceImpl
        implements ResultService {

    @Autowired
    private ResultRepository resultRepository;

    // =========================
    // SAVE RESULT
    // =========================

    @Override
    public Result saveResult(
            Result result
    ) {

        return resultRepository.save(result);
    }

    // =========================
    // GET ALL RESULTS
    // =========================

    @Override
    public List<Result> getAllResults() {

        return resultRepository.findAll();
    }

    // =========================
    // GET RESULT BY ID
    // =========================

    @Override
    public Result getResultById(
            Long id
    ) {

        return resultRepository.findById(id)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Result not found"
                        )
                );
    }

    // =========================
    // DELETE RESULT
    // =========================

    @Override
    public String deleteResult(
            Long id
    ) {

        Result result =
                getResultById(id);

        resultRepository.delete(result);

        return "Result Deleted Successfully";
    }
}