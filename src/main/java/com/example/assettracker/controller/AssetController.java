package com.example.assettracker.controller;

import com.example.assettracker.dto.AssetResponse;
import com.example.assettracker.dto.CreateAssetRequest;
import com.example.assettracker.service.AssetService;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * AssetController
 * ----------------
 * Controllers handle HTTP requests and return responses. They are the
 * "web layer" of a Spring Boot app. Typical pattern:
 * - Annotate with @RestController to expose JSON endpoints.
 * - Inject a Service to perform business logic (separation of concerns).
 * - Use @RequestMapping/@GetMapping/@PostMapping to map URLs.
 */
@RestController
@RequestMapping("/api/assets")
public class AssetController {

    // Constructor injection is the recommended way to get dependencies in Spring.
    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    // GET /api/assets -> returns all assets
    @GetMapping
    public List<AssetResponse> getAssets(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String location
    ) {
        return assetService.getAssets(status, category, location);
    }

    @GetMapping("/paged")
    public Page<AssetResponse> getAssetsPaged(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "assetTag") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {
        return assetService.getAssetsPaged(page, size, sortBy, direction);
    }

    // GET /api/assets/{id} -> returns a single asset by id
    @GetMapping("/{id}")
    public AssetResponse getAssetById(@PathVariable String id) {
        return assetService.getAssetById(id);
    }

    // POST /api/assets -> create a new asset. @Valid triggers validation annotations
    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody CreateAssetRequest request) {
        AssetResponse created = assetService.createAsset(request);
        // Return 201 Created with the created asset in the body
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
