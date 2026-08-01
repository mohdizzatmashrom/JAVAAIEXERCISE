package com.example.assettracker.dto;

import java.time.LocalDateTime;
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
    private int status;
    private LocalDateTime timestamp;
    private List<FieldErrorDetail> errors;

    public ApiErrorResponse(String message, int status, List<FieldErrorDetail> errors) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public List<FieldErrorDetail> getErrors() {
        return errors;
    }
}
