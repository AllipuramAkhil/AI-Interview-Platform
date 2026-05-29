package com.akhil.interviewplatform.exception;

import java.time.LocalDateTime;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // =========================
    // VALIDATION EXCEPTION
    // =========================

    @ExceptionHandler(MethodArgumentNotValidException.class)

    public ResponseEntity<Map<String, Object>>
    handleValidationExceptions(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> validationErrors =
                new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {

                    validationErrors.put(
                            error.getField(),
                            error.getDefaultMessage()
                    );
                });

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "timestamp",
                LocalDateTime.now()
        );

        response.put(
                "status",
                HttpStatus.BAD_REQUEST.value()
        );

        response.put(
                "message",
                "Validation Failed"
        );

        response.put(
                "errors",
                validationErrors
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    // =========================
    // RUNTIME EXCEPTION
    // =========================

    @ExceptionHandler(RuntimeException.class)

    public ResponseEntity<Map<String, Object>>
    handleRuntimeException(
            RuntimeException ex
    ) {

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "timestamp",
                LocalDateTime.now()
        );

        response.put(
                "status",
                HttpStatus.BAD_REQUEST.value()
        );

        response.put(
                "message",
                ex.getMessage()
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    // =========================
    // GENERIC EXCEPTION
    // =========================

    @ExceptionHandler(Exception.class)

    public ResponseEntity<Map<String, Object>>
    handleGenericException(
            Exception ex
    ) {

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "timestamp",
                LocalDateTime.now()
        );

        response.put(
                "status",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );

        response.put(
                "message",
                "Something went wrong"
        );

        response.put(
                "error",
                ex.getMessage()
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}