package com.example.supportdesk.service;

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
public class TicketReportService {

    private static final Logger logger = LoggerFactory.getLogger(TicketReportService.class);

    private final MongoTemplate mongoTemplate;

    public TicketReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> countTicketsByStatus() {
        logger.info("Generating ticket count report by status");

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("status").count().as("count"),
                Aggregation.project("count").and("_id").as("label"),
                Aggregation.sort(Sort.Direction.ASC, "label")
        );

        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation,
                "tickets",
                ReportCountResponse.class
        );

        return results.getMappedResults();
    }

    public List<ReportCountResponse> countTicketsByPriority() {
        logger.info("Generating ticket count report by priority");

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("priority").count().as("count"),
                Aggregation.project("count").and("_id").as("label"),
                Aggregation.sort(Sort.Direction.ASC, "label")
        );

        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation,
                "tickets",
                ReportCountResponse.class
        );

        return results.getMappedResults();
    }
}
