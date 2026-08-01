# Day 7 Exercise 2: Create Ticket Model and Repository

## Objective

In this exercise, you will prepare your Support Desk API to work with MongoDB.

You will create:

```text
Ticket model
TicketRepository
MongoDB configuration
```

---

## Scenario

Your Support Desk API currently stores ticket data in memory.

Now you will prepare the project so tickets can be stored in MongoDB.

---

## Task 1: Add MongoDB Dependency

Add the Spring Data MongoDB dependency to your `pom.xml`.

After adding it, reload Maven dependencies in your IDE if needed.

---

## Task 2: Configure MongoDB Connection

In your local configuration file, configure the MongoDB URI for your project.

Use this database name:

```text
support_desk_db
```

Your application should connect to MongoDB running locally on the default MongoDB port.

---

## Task 3: Create the Ticket Model

Create a new package:

```text
model
```

Inside it, create a `Ticket` class.

The ticket document should contain these fields:

```text
id
title
description
category
priority
status
createdBy
createdAt
```

The class must be mapped to a MongoDB collection named:

```text
tickets
```

---

## Task 4: Create the Ticket Repository

Create a new package:

```text
repository
```

Inside it, create a repository interface for tickets.

The repository should allow your Spring Boot application to perform basic MongoDB operations for Ticket documents.

---

## Requirements

Your project should have this additional structure:

```text
src/main/java/com/example/supportdesk/
├── model/
│   └── Ticket.java
└── repository/
    └── TicketRepository.java
```

---

## Testing

Start your Spring Boot application with the local profile.

If the application starts successfully, your MongoDB configuration is probably correct.

If it fails, check:

1. MongoDB is running.
2. Your MongoDB URI is correct.
3. Your package names are correct.
4. Your imports are correct.

---

## Submission

Submit:

1. `Ticket.java`
2. `TicketRepository.java`
3. Your MongoDB connection property

---

## Reminder

Do not convert your service yet.

This exercise only prepares the model, repository, and database connection.
