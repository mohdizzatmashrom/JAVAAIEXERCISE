package com.example.assettracker.dto;

/*
 * FieldErrorDetail
 * ----------------
 * Simple structure used to return validation error details to clients.
 * Each entry contains the field name and a message describing the problem.
 */
public class FieldErrorDetail {

    private String field;
    private String message;

    public FieldErrorDetail(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public String getMessage() {
        return message;
    }
}
