package com.example.assettracker.controller;

import com.example.supportdesk.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/readiness")
public class ReadinessController {

    private final TicketRepository ticketRepository;

    public ReadinessController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> readiness() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("service", "support-desk-api");

        try {
            ticketRepository.count();
            response.put("status", "READY");
            response.put("database", "CONNECTED");
            return ResponseEntity.ok(response);
        } catch (RuntimeException exception) {
            response.put("status", "NOT_READY");
            response.put("database", "UNAVAILABLE");
            response.put("message", "Database readiness check failed");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }
}
