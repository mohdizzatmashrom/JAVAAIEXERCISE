package com.example.supportdesk.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;

    private String title;
    private String description;
    @Indexed
    private String category;
    @Indexed
    private String priority;
    @Indexed
    private String status;
    @Indexed
    private String createdBy;
    @Indexed
    private LocalDateTime createdAt;

    public Ticket() {
    }

    public Ticket(String title, String description, String category, String priority,
                  String status, String createdBy, LocalDateTime createdAt) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
