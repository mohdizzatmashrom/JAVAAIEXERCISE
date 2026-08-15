package com.example.assettracker.service;

import com.example.assettracker.dto.AssetResponse;
import com.example.assettracker.dto.CreateAssetRequest;
import com.example.assettracker.dto.UpdateAssetRequest;
import com.example.assettracker.exception.DuplicateResourceException;
import com.example.assettracker.exception.InvalidRequestException;
import com.example.assettracker.exception.ResourceNotFoundException;
import com.example.assettracker.model.Asset;
import com.example.assettracker.repository.AssetRepository;
import com.example.assettracker.util.InputSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AssetService {

    private static final Logger logger = LoggerFactory.getLogger(AssetService.class);

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "assetTag",
            "name",
            "category",
            "serialNumber",
            "status",
            "location",
            "assignedTo"
    );

    private static final Set<String> ALLOWED_STATUSES = Set.of(
            "AVAILABLE",
            "ASSIGNED",
            "MAINTENANCE"
    );

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<AssetResponse> getAssets(String status, String category, String location) {
        // Sanitise query parameters: trim + convert blank to null
        String s = InputSanitizer.trimToNull(status);
        String c = InputSanitizer.trimToNull(category);
        String l = InputSanitizer.trimToNull(location);

        logger.info("Fetching assets with status={}, category={}, location={}", s, c, l);

        List<Asset> assets;

        if (s != null) {
            assets = assetRepository.findByStatusIgnoreCase(s);
        } else if (c != null) {
            assets = assetRepository.findByCategoryIgnoreCase(c);
        } else if (l != null) {
            assets = assetRepository.findByLocationContainingIgnoreCase(l);
        } else {
            assets = assetRepository.findAll();
        }

        logger.info("Found {} asset(s)", assets.size());

        return assets.stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<AssetResponse> getAssetsPaged(int page, int size, String sortBy, String direction) {
        logger.info("Fetching paged assets page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);

        validatePageRequest(page, size, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return assetRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public AssetResponse getAssetById(String id) {
        logger.info("Fetching asset by id={}", id);

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset " + id + " was not found"));

        return toResponse(asset);
    }

    public AssetResponse createAsset(CreateAssetRequest request) {
        // Sanitise code-like fields (trim + remove control chars + uppercase)
        String assetTag = InputSanitizer.upperCode(request.getAssetTag());
        String serialNumber = InputSanitizer.upperCode(request.getSerialNumber());

        // Sanitise free-text fields (trim + remove control chars)
        String name = InputSanitizer.cleanText(request.getName());
        String category = InputSanitizer.cleanText(request.getCategory());
        String location = InputSanitizer.cleanText(request.getLocation());

        if (assetRepository.existsByAssetTag(assetTag)) {
            throw new DuplicateResourceException("Asset tag already exists: " + assetTag);
        }

        if (assetRepository.existsBySerialNumber(serialNumber)) {
            throw new DuplicateResourceException("Serial number already exists: " + serialNumber);
        }

        Asset asset = new Asset(
                assetTag,
                name,
                category,
                serialNumber,
                "AVAILABLE",
                location,
                null
        );

        Asset savedAsset = assetRepository.save(asset);
        return toResponse(savedAsset);
    }

    public AssetResponse updateAsset(String id, UpdateAssetRequest request) {
        logger.info("Updating asset id={}", id);

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset " + id + " was not found"));

        // Sanitise code-like fields
        String assetTag = InputSanitizer.upperCode(request.getAssetTag());
        String serialNumber = InputSanitizer.upperCode(request.getSerialNumber());
        String status = InputSanitizer.upperCode(request.getStatus());

        // Sanitise free-text fields
        String name = InputSanitizer.cleanText(request.getName());
        String category = InputSanitizer.cleanText(request.getCategory());
        String location = InputSanitizer.cleanText(request.getLocation());
        String assignedTo = InputSanitizer.normalizeOptional(request.getAssignedTo());

        validateStatus(status);

        if (!asset.getAssetTag().equalsIgnoreCase(assetTag) && assetRepository.existsByAssetTag(assetTag)) {
            throw new DuplicateResourceException("Asset tag already exists: " + assetTag);
        }

        if (!asset.getSerialNumber().equalsIgnoreCase(serialNumber) && assetRepository.existsBySerialNumber(serialNumber)) {
            throw new DuplicateResourceException("Serial number already exists: " + serialNumber);
        }

        asset.setAssetTag(assetTag);
        asset.setName(name);
        asset.setCategory(category);
        asset.setSerialNumber(serialNumber);
        asset.setStatus(status);
        asset.setLocation(location);
        asset.setAssignedTo(assignedTo);

        Asset savedAsset = assetRepository.save(asset);
        return toResponse(savedAsset);
    }

    private void validatePageRequest(int page, int size, String sortBy, String direction) {
        if (page < 0) {
            throw new InvalidRequestException("Page must be zero or greater");
        }

        if (size < 1 || size > 50) {
            throw new InvalidRequestException("Size must be between 1 and 50");
        }

        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new InvalidRequestException("Sort field is not allowed: " + sortBy);
        }

        if (!direction.equalsIgnoreCase("asc") && !direction.equalsIgnoreCase("desc")) {
            throw new InvalidRequestException("Direction must be either asc or desc");
        }
    }

    private void validateStatus(String status) {
        if (!ALLOWED_STATUSES.contains(status)) {
            throw new InvalidRequestException("Status must be AVAILABLE, ASSIGNED or MAINTENANCE");
        }
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }

    public void deleteAsset(String id) {
        if (!assetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asset " + id + " was not found");
        }
        assetRepository.deleteById(id);
        logger.info("Deleted asset id={}", id);
    }

    private AssetResponse toResponse(Asset asset) {
        return new AssetResponse(
                asset.getId(),
                asset.getAssetTag(),
                asset.getName(),
                asset.getCategory(),
                asset.getSerialNumber(),
                asset.getStatus(),
                asset.getLocation(),
                asset.getAssignedTo()
        );
    }
}
