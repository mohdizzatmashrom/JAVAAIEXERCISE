package com.example.assettracker.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.assettracker.model.Asset;

public interface AssetRepository extends MongoRepository<Asset, String> {
    /*
    // Custom query methods can be defined here if needed
    // /api/assets/{id}
    // /api/assets?status=AVAILABLE filter assets by status
    // /api/assets?category=Laptop filter assets by category
    // /api/assets?page=1&size=10 Control page and size 
    // findByStatusIgnoreCase("AVAILABLE")
    {
        "status": "AVAILABLE"
    }
    */

    List<Asset> findByStatusIgnoreCase(String status);

    List<Asset> findByCategoryIgnoreCase(String category);

    List<Asset> findByLocationContainingIgnoreCase(String location);

    boolean existsByAssetTag(String assetTag);

    boolean existsBySerialNumber(String serialNumber);

}
