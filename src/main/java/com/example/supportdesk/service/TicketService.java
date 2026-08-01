package com.example.supportdesk.service;

import com.example.assettracker.exception.InvalidRequestException;
import com.example.assettracker.exception.ResourceNotFoundException;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class TicketService {

    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    private static final Set<String> ALLOWED_PRIORITIES = Set.of("LOW", "MEDIUM", "HIGH");

    private static final Set<String> ALLOWED_STATUSES = Set.of("OPEN", "IN_PROGRESS", "CLOSED");

    private final TicketRepository ticketRepository;
    private final MongoTemplate mongoTemplate;

    public TicketService(TicketRepository ticketRepository, MongoTemplate mongoTemplate) {
        this.ticketRepository = ticketRepository;
        this.mongoTemplate = mongoTemplate;
    }

    // Return all tickets from MongoDB
    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Filter tickets by status, priority, or category (only one filter at a time)
    // If all params are null, returns all tickets
    public List<TicketResponse> getFilteredTickets(String status, String priority, String category) {
        logger.info("Fetching tickets with filters - status: {}, priority: {}, category: {}", status, priority, category);
        List<Ticket> tickets;

        if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::toResponse)
                .toList();
    }

    // Return one ticket by ID from MongoDB, or throw 404
    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));

        return toResponse(ticket);
    }

    // Create a new ticket and save to MongoDB
    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus("OPEN");
        ticket.setCreatedBy(request.getCreatedBy());
        ticket.setCreatedAt(LocalDateTime.now());

        Ticket savedTicket = ticketRepository.save(ticket);
        logger.info("Created ticket with id: '{}', title: '{}'", savedTicket.getId(), savedTicket.getTitle());
        return toResponse(savedTicket);
    }

    // Update an existing ticket in MongoDB, or throw 404 if it does not exist
    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        logger.info("Updating ticket id={}", id);

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));

        String priority = request.getPriority().trim().toUpperCase();
        String status = request.getStatus().trim().toUpperCase();

        validatePriority(priority);
        validateStatus(status);

        ticket.setTitle(request.getTitle().trim());
        ticket.setDescription(request.getDescription().trim());
        ticket.setCategory(request.getCategory().trim());
        ticket.setPriority(priority);
        ticket.setStatus(status);

        Ticket updatedTicket = ticketRepository.save(ticket);
        logger.info("Updated ticket with id: '{}', title: '{}'", updatedTicket.getId(), updatedTicket.getTitle());
        return toResponse(updatedTicket);
    }

    // Return a paged and sorted list of tickets
    public Page<TicketResponse> getPagedTickets(Pageable pageable) {
        logger.info("Fetching paginated tickets - page: {}, size: {}, sort: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return ticketRepository.findAll(pageable)
                .map(this::toResponse);
    }

    // Return a paged, sorted, and filtered list of tickets (supports status and search text)
    public Page<TicketResponse> getPagedTickets(Pageable pageable, String status, String searchText) {
        logger.info("Fetching paginated tickets - page: {}, size: {}, sort: {}, status: {}, searchText: {}",
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort(), status, searchText);

        Query query = new Query();

        // Apply status filter
        if (status != null && !status.isBlank()) {
            query.addCriteria(Criteria.where("status").is(status.toUpperCase()));
        }

        // Apply search text filter (matches title or category, case-insensitive)
        if (searchText != null && !searchText.isBlank()) {
            String escaped = Pattern.quote(searchText);
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("title").regex(escaped, "i"),
                    Criteria.where("category").regex(escaped, "i")
            ));
        }

        long total = mongoTemplate.count(query, Ticket.class);
        query.with(pageable);

        List<Ticket> tickets = mongoTemplate.find(query, Ticket.class);
        List<TicketResponse> responses = tickets.stream().map(this::toResponse).toList();

        return new PageImpl<>(responses, pageable, total);
    }

    // Helper to reject priorities outside LOW, MEDIUM, HIGH
    private void validatePriority(String priority) {
        if (!ALLOWED_PRIORITIES.contains(priority)) {
            throw new InvalidRequestException("Invalid priority: " + priority + ". Allowed priorities are: " + ALLOWED_PRIORITIES);
        }
    }

    // Helper to reject statuses outside OPEN, IN_PROGRESS, CLOSED
    private void validateStatus(String status) {
        if (!ALLOWED_STATUSES.contains(status)) {
            throw new InvalidRequestException("Invalid status: " + status + ". Allowed statuses are: " + ALLOWED_STATUSES);
        }
    }

    // Helper to convert Ticket model to TicketResponse DTO
    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt()
        );
    }
}
