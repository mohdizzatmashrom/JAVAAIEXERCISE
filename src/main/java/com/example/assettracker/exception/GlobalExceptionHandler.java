package com.example.assettracker.exception;

import com.example.assettracker.dto.ApiErrorResponse;
import com.example.assettracker.dto.FieldErrorDetail;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

/*
 * GlobalExceptionHandler
 * ----------------------
 * Central place to convert Java exceptions into HTTP responses.
 * - @RestControllerAdvice makes these handlers apply across all controllers.
 * - @ExceptionHandler methods deal with specific exception types.
 * - This keeps controller code focused on happy-path logic.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Map ResourceNotFoundException -> 404 Not Found with a simple JSON body.
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleResourceNotFound(ResourceNotFoundException exception) {
        return new ApiErrorResponse(exception.getMessage());
    }

    // Map validation errors (triggered by @Valid) -> 400 Bad Request.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidationError(MethodArgumentNotValidException exception) {
        List<FieldErrorDetail> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldErrorDetail(error.getField(), error.getDefaultMessage()))
                .toList();

        return new ApiErrorResponse("Validation failed", errors);
    }
}
