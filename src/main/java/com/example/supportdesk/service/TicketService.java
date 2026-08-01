package com.example.supportdesk.service;

import com.example.assettracker.exception.ResourceNotFoundException;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
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

    // Return a paged and sorted list of tickets
    public Page<TicketResponse> getPagedTickets(Pageable pageable) {
        logger.info("Fetching paginated tickets - page: {}, size: {}, sort: {}", pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return ticketRepository.findAll(pageable)
                .map(this::toResponse);
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
