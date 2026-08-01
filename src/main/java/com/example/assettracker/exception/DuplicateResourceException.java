package com.example.assettracker.exception;

/*
* There are two places to handle duplicates:
*
* 1. Application layer:
* We check before saving and return a friendly 409 Conflict response.
*
* 2. Database layer:
* MongoDB unique index guarantees that duplicates cannot be stored,
* even if the application code has a bug.
* */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}