package com.example.assettracker.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assettracker.dto.ReportCountResponse;
import com.example.assettracker.service.AssetReportService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final AssetReportService assetReportService;

    public ReportController(AssetReportService assetReportService) {
        this.assetReportService = assetReportService;
    }

    @GetMapping("/assets-by-status")
    public List<ReportCountResponse> getAssetsByStatus() {
        return assetReportService.countAssetsByStatus();
    }

    @GetMapping("/assets-by-category")
    public List<ReportCountResponse> getAssetsByCategory() {
        return assetReportService.countAssetsByCategory();
    }

    @GetMapping("/assets-by-location")
    public List<ReportCountResponse> getAssetsByLocation() {
        return assetReportService.countAssetsByLocation();
    }
    
}
