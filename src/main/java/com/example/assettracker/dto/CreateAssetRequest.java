package com.example.assettracker.dto;

import jakarta.validation.constraints.NotBlank;

/*
 * CreateAssetRequest
 * ------------------
 * DTO (Data Transfer Object) used to capture incoming JSON for creating
 * a new Asset. Validation annotations (from Jakarta Bean Validation)
 * such as @NotBlank are used to ensure required fields are provided.
 * When @Valid is used in a controller, Spring will automatically validate
 * the incoming request and throw MethodArgumentNotValidException on failure.
 */
public class CreateAssetRequest {

    @NotBlank(message = "Asset tag is required")
    private String assetTag;

    @NotBlank(message = "Asset name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Serial number is required")
    private String serialNumber;

    @NotBlank(message = "Location is required")
    private String location;

    // Standard getters and setters are required for Jackson to bind JSON -> object.
    public String getAssetTag() {
        return assetTag;
    }

    public void setAssetTag(String assetTag) {
        this.assetTag = assetTag;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
