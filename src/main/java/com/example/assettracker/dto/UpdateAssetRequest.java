package com.example.assettracker.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateAssetRequest {

    @NotBlank(message = "Asset tag is required")
    private String assetTag;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Serial number is required")
    private String serialNumber;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Location is required")
    private String location;

    private String assignedTo;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }
}
