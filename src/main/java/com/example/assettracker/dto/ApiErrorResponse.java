package com.example.assettracker.dto;

import java.util.List;

/*
 * ApiErrorResponse
 * ----------------
 * Standard shape for error responses returned by the API. Keeping a common
 * error format makes it easier for front-end code (and students) to handle
 * errors consistently.
 */
public class ApiErrorResponse {

    private String message;
    private List<FieldErrorDetail> errors;

    public ApiErrorResponse(String message) {
        this.message = message;
        this.errors = List.of();
    }

    public ApiErrorResponse(String message, List<FieldErrorDetail> errors) {
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public List<FieldErrorDetail> getErrors() {
        return errors;
    }
}
