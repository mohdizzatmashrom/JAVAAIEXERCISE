# Day 16 Exercise 0 - Prompt Engineering Warm-Up — Answer

## Prompt 1 — Poor (Too Vague)

```text
Fix the service class so it is better.
```

**Why this is poor:**
No file, no goal, no constraints. The AI could change anything and break endpoints, DTOs, or the database layer.

---

## Prompt 2 — Better Developer Prompt

```text
Context:
  I am working on a Spring Boot Support Desk application (Java 21, Spring Boot 3, MongoDB).
  The file I need help with is:
    src/main/java/com/example/supportdesk/service/TicketService.java

  This service class is used by TicketController and TicketV1Controller.
  It provides CRUD operations for support tickets stored in MongoDB,
  including filtering, pagination, and search.

Task:
  Refactor the getFilteredTickets(String status, String priority, String category)
  method so that it supports combining multiple filters at the same time
  (e.g. status + priority, or status + category + priority).
  Currently only one filter is applied because the method uses if / else-if chains.
  I want the method to build a dynamic MongoDB query that applies every
  non-null filter together using AND logic.

Constraints:
  - Do NOT change any REST endpoint paths, HTTP methods, or response codes.
  - Do NOT change the method signature (same parameters, same return type).
  - Do NOT modify the Ticket model, TicketResponse DTO, or TicketRepository interface.
  - Do NOT add new dependencies — use only MongoTemplate or the existing repository.
  - Keep the existing single-filter behaviour working when only one parameter is provided.

Expected output:
  - Return the full updated getFilteredTickets() method body.
  - Show any new private helper methods you add to TicketService.
  - Keep the existing logger statement at the top of the method.

Tests:
  - List the test cases I should write to verify the change, for example:
      1. Filter by status only  → returns only OPEN tickets
      2. Filter by status AND priority → returns only OPEN + HIGH tickets
      3. Filter by all three → returns tickets matching all three
      4. No filters (all null) → returns all tickets
  - Suggest assertions for each test case (status code, body size, field values).

Review:
  - After providing the code, list any risks or edge cases I should be aware of,
    such as:
      - What happens if a caller passes an empty string instead of null?
      - Could this break the existing GET /api/v1/tickets endpoint?
      - Are there any performance concerns with combined MongoDB queries?
  - Suggest one follow-up improvement that could be made later (do not implement it now).
```

---

## Why the Second Prompt Is Safer

The better prompt acts like a **specification**: it names the exact file, limits the scope to one method, forbids changes to endpoints/DTOs/model, lists test cases, and asks for risk analysis. The poor prompt gives the AI no guardrails, so any change is unpredictable and unsafe to merge.
