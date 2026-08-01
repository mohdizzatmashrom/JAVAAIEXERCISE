package com.example.supportdesk.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.supportdesk.model.Ticket;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {

    // Find tickets by status (e.g. OPEN, CLOSED, IN_PROGRESS)
    List<Ticket> findByStatus(String status);

    // Find tickets by priority (e.g. LOW, MEDIUM, HIGH)
    List<Ticket> findByPriority(String priority);

    // Find tickets by category (e.g. Email, Network, Software)
    List<Ticket> findByCategory(String category);
}
