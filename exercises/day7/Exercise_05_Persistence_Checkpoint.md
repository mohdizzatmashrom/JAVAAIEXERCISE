# Day 7 Exercise 5: Persistence Checkpoint

## Objective

In this checkpoint, you will prove that your API now stores data permanently in MongoDB.

---

## Task

Follow these steps:

1. Start MongoDB.
2. Start your Spring Boot Support Desk API.
3. Create a new ticket using `POST /api/tickets`.
4. Confirm it appears using `GET /api/tickets`.
5. Stop your Spring Boot application.
6. Start your Spring Boot application again.
7. Run `GET /api/tickets` again.
8. Confirm the ticket is still there.

---

## Reflection Questions

Answer these questions:

1. What is the role of the repository?
2. What is the difference between `Ticket` and `TicketResponse`?
3. What does MongoDB store as the document ID?
4. Why should the controller not talk directly to MongoDB?

---

## Submission

Submit a short note containing:

1. Your test steps
2. The ID of the ticket you created
3. Confirmation that the ticket remained after restart
4. Answers to the reflection questions
