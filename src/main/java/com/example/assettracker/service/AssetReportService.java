package com.example.assettracker.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import com.example.assettracker.dto.ReportCountResponse;

@Service
public class AssetReportService {

    private static final Logger logger = LoggerFactory.getLogger(AssetReportService.class);

    private final MongoTemplate mongoTemplate;

    public AssetReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> countAssetsByStatus() {
        logger.info("Generating asset count report by status");
        return countAssetsByField("status");
    }

    public List<ReportCountResponse> countAssetsByCategory() {
        logger.info("Generating asset count report by category");
        return countAssetsByField("category");
    }

    public List<ReportCountResponse> countAssetsByLocation() {
        logger.info("Generating asset count report by location");
        return countAssetsByField("location");
    }

    private List<ReportCountResponse> countAssetsByField(String field) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group(field).count().as("count"),
                Aggregation.project("count").and("_id").as("label"),
                Aggregation.sort(Sort.Direction.ASC, "label")
        );

        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation, 
                "assets", 
                ReportCountResponse.class
        );
        
        return results.getMappedResults();
    }
}
