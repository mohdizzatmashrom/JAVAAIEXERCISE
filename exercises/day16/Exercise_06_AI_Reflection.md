# Day 16 Exercise 6 - AI-Assisted Coding Reflection

## Task

Answer these questions briefly.

1. **What did the AI assistant help you do faster?**
   Generating helper methods like `findTicketOrThrow` and `normalizeStatus` in TicketService. It also drafted the validation utility functions and unit tests quickly, which saved a lot of boilerplate typing.

2. **What AI suggestion did you reject or change?**
   The AI initially suggested renaming some DTO fields to be more "consistent," but I rejected that because it would have changed the API response shape and broken the frontend.

3. **Why should developers not accept generated code blindly?**
   Because AI can introduce subtle bugs, use wrong assumptions about your codebase, or change behaviour that existing tests rely on. You still need to read and verify every line.

4. **What private information should never be pasted into AI tools?**
   Database credentials, API keys, internal server URLs, user personal data, and any production secrets or tokens.

5. **What tests proved that your refactor preserved behaviour?**
   The unit tests for the ticket validation utility (required-field, invalid priority, normalization) and the HTTP requests to the backend confirming create, update, and 404 paths still returned the same responses.

6. **What part of AI-assisted refactoring still feels unclear?**
   Knowing when to stop — it's sometimes hard to tell if the AI's suggested refactor is actually an improvement or just a different way of doing the same thing that adds unnecessary complexity.

## Expected output

Optional: Submit your answers with screenshots or command output showing that tests passed.
