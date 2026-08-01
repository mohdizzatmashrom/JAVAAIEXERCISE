package com.example.assettracker.dto;

import java.util.List;

public class ApiDocumentationResponse {

    private String application;
    private String version;
    private String baseUrl;
    private List<ApiEndpointResponse> endpoints;

    public ApiDocumentationResponse(String application, String version, String baseUrl, List<ApiEndpointResponse> endpoints) {
        this.application = application;
        this.version = version;
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    }

    public String getApplication() {
        return application;
    }

    public String getVersion() {
        return version;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public List<ApiEndpointResponse> getEndpoints() {
        return endpoints;
    }
}
