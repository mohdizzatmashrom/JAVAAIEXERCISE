package com.example.assettracker.dto;

/*
 * AssetResponse
 * -------------
 * Simple DTO returned by controller endpoints. DTOs separate the internal
 * model/storage from the JSON contract the API exposes. Keeping DTOs simple
 * and focused helps when changing internal storage later (for example,
 * replacing in-memory lists with a real database).
 */
public class AssetResponse {

    private String id;
    private String assetTag;
    private String name;
    private String category;
    private String serialNumber;
    private String status;
    private String location;
    private String assignedTo;

    public AssetResponse(String id, String assetTag, String name, String category,
                         String serialNumber, String status, String location, String assignedTo) {
        this.id = id;
        this.assetTag = assetTag;
        this.name = name;
        this.category = category;
        this.serialNumber = serialNumber;
        this.status = status;
        this.location = location;
        this.assignedTo = assignedTo;
    }

    public String getId() {
        return id;
    }

    public String getAssetTag() {
        return assetTag;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public String getStatus() {
        return status;
    }

    public String getLocation() {
        return location;
    }

    public String getAssignedTo() {
        return assignedTo;
    }
}
