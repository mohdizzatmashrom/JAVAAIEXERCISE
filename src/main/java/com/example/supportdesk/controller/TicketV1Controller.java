package com.example.supportdesk.controller;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Versioned Ticket API (v1).
 *
 * <p>This controller exposes the same ticket operations under a versioned route
 * ({@code /api/v1/tickets}) so that breaking changes can be introduced in a
 * future {@code v2} without affecting existing clients that depend on v1.</p>
 */
@RestController
@RequestMapping("/api/v1/tickets")
public class TicketV1Controller {

    private final TicketService ticketService;

    public TicketV1Controller(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // GET /api/v1/tickets -> returns all tickets, optionally filtered by status, priority, or category
    @GetMapping
    public List<TicketResponse> getAllTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
        return ticketService.getFilteredTickets(status, priority, category);
    }

    // GET /api/v1/tickets/{id} -> returns a single ticket by id
    @GetMapping("/{id}")
    public TicketResponse getTicketById(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    // POST /api/v1/tickets -> creates a new ticket
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TicketResponse createTicket(@Valid @RequestBody CreateTicketRequest request) {
        return ticketService.createTicket(request);
    }
}
