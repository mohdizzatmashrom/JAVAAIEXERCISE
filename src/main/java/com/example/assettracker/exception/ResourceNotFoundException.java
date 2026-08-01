package com.example.assettracker.exception;

/*
 * ResourceNotFoundException
 * -------------------------
 * A runtime exception used to indicate that a requested resource
 * (for example, an Asset by id) could not be found.
 * Throwing a plain RuntimeException is acceptable for small examples; the
 * GlobalExceptionHandler maps this exception to a clean HTTP 404 response.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
