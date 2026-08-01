package com.example.assettracker.repository;

import com.example.assettracker.model.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssetRepository extends MongoRepository<Asset, String> {

    List<Asset> findByStatusIgnoreCase(String status);

    List<Asset> findByCategoryIgnoreCase(String category);

    List<Asset> findByLocationContainingIgnoreCase(String location);

    boolean existsByAssetTag(String assetTag);

    boolean existsBySerialNumber(String serialNumber);
}
