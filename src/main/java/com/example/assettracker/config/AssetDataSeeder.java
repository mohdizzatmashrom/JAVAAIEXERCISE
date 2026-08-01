package com.example.assettracker.config;

import com.example.assettracker.model.Asset;
import com.example.assettracker.repository.AssetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AssetDataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(AssetDataSeeder.class);

    @Bean
    CommandLineRunner seedAssets(AssetRepository assetRepository) {
        return args -> {
            createAssetIfMissing(assetRepository, "LAP-2026-4721", "Dell Latitude 5440", "Laptop", "SN-LAP-A1B2C3D4", "AVAILABLE", "HQ Level 3", null);
            createAssetIfMissing(assetRepository, "LAP-2026-8642", "Lenovo ThinkPad T14", "Laptop", "SN-LAP-B3C4D5E6", "ASSIGNED", "HQ Level 2", "carlos@example.com");
            createAssetIfMissing(assetRepository, "LAP-2026-3197", "HP EliteBook 840", "Laptop", "SN-LAP-C7D8E9F0", "MAINTENANCE", "IT Store", null);
            createAssetIfMissing(assetRepository, "MON-2026-2034", "Dell 24-inch Monitor", "Monitor", "SN-MON-D1E2F3A4", "AVAILABLE", "HQ Level 1", null);
            createAssetIfMissing(assetRepository, "MON-2026-7789", "LG UltraWide Monitor", "Monitor", "SN-MON-E5F6A7B8", "ASSIGNED", "HQ Level 3", "mikel@example.com");
            createAssetIfMissing(assetRepository, "PRJ-2026-4410", "Epson Projector", "Projector", "SN-PRJ-F9A0B1C2", "AVAILABLE", "Training Room A", null);
            createAssetIfMissing(assetRepository, "TAB-2026-5506", "Samsung Galaxy Tab", "Tablet", "SN-TAB-A2B3C4D5", "AVAILABLE", "HQ Level 4", null);
            createAssetIfMissing(assetRepository, "TAB-2026-1812", "Apple iPad", "Tablet", "SN-TAB-B4C5D6E7", "ASSIGNED", "HQ Level 4", "ignacio@example.com");
            createAssetIfMissing(assetRepository, "PHN-2026-0375", "iPhone 15", "Phone", "SN-PHN-C9D0E1F2", "ASSIGNED", "HQ Level 2", "isabel@example.com");
            createAssetIfMissing(assetRepository, "PHN-2026-6601", "Samsung Galaxy S24", "Phone", "SN-PHN-D3E4F5A6", "AVAILABLE", "IT Store", null);
            createAssetIfMissing(assetRepository, "SRV-2026-9123", "Dell PowerEdge Server", "Server", "SN-SRV-E7F8A9B0", "AVAILABLE", "Data Centre", null);
            createAssetIfMissing(assetRepository, "NET-2026-3248", "Cisco Switch", "Network", "SN-NET-F1A2B3C4", "MAINTENANCE", "Data Centre", null);

            logger.info("Asset seeding completed.");
        };
    }
    private void createAssetIfMissing(
            AssetRepository assetRepository,
            String assetTag,
            String name,
            String category,
            String serialNumber,
            String status,
            String location,
            String assignedTo
    ) {
        if (assetRepository.existsByAssetTag(assetTag)) {
            logger.info("Skipping seed asset. Asset tag already exists: {}", assetTag);
            return;
        }

        if (assetRepository.existsBySerialNumber(serialNumber)) {
            logger.info("Skipping seed asset. Serial number already exists: {}", serialNumber);
            return;
        }

        assetRepository.save(new Asset(
                assetTag,
                name,
                category,
                serialNumber,
                status,
                location,
                assignedTo
        ));
    }
}
