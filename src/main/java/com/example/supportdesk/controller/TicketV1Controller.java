package com.example.supportdesk.controller;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // GET /api/v1/tickets/paged -> returns a page of tickets with sorting and optional filters
    @GetMapping("/paged")
    public Page<TicketResponse> getPagedTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String searchText) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ticketService.getPagedTickets(pageable, status, searchText);
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

    // PUT /api/v1/tickets/{id} -> updates an existing ticket
    @PutMapping("/{id}")
    public TicketResponse updateTicket(@PathVariable String id, @Valid @RequestBody UpdateTicketRequest request) {
        return ticketService.updateTicket(id, request);
    }
}
