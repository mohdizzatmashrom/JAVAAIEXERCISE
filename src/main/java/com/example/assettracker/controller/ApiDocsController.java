package com.example.assettracker.controller;

import com.example.assettracker.dto.ApiDocumentationResponse;
import com.example.assettracker.dto.ApiEndpointResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/docs")
public class ApiDocsController {

    @GetMapping
    public ApiDocumentationResponse getDocumentation() {
        return new ApiDocumentationResponse(
                "Asset Tracker API",
                "v1",
                "/api/v1",
                List.of(
                        new ApiEndpointResponse("POST", "/api/auth/register", "Public", "Register a new user account."),
                        new ApiEndpointResponse("POST", "/api/auth/login", "Public", "Login and receive a JWT bearer token."),
                        new ApiEndpointResponse("GET", "/api/v1/info", "Public", "View API version and basic information."),
                        new ApiEndpointResponse("GET", "/api/v1/assets", "USER or ADMIN", "List assets, optionally filtered by status, category, or location."),
                        new ApiEndpointResponse("GET", "/api/v1/assets/paged", "USER or ADMIN", "List assets using pagination and sorting."),
                        new ApiEndpointResponse("GET", "/api/v1/assets/{id}", "USER or ADMIN", "Get one asset by MongoDB id."),
                        new ApiEndpointResponse("POST", "/api/v1/assets", "ADMIN", "Create a new asset."),
                        new ApiEndpointResponse("GET", "/api/v1/reports/assets-by-status", "USER or ADMIN", "Count assets grouped by status."),
                        new ApiEndpointResponse("GET", "/api/v1/reports/assets-by-category", "USER or ADMIN", "Count assets grouped by category."),
                        new ApiEndpointResponse("GET", "/api/v1/reports/assets-by-location", "USER or ADMIN", "Count assets grouped by location.")
                )
        );
    }
}
