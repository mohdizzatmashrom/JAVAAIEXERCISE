# Day 16 Prompt Bank - Expanded Developer Prompt Engineering Examples
Use this prompt bank during Day 16. Prompting is not just asking a question. A good prompt gives context, constraints and a clear output format.


---

# 1. Prompt structure template

```text
Context:
I am working on [project/framework/file]. The code currently does [brief explanation].

Task:
I want you to [specific action].

Constraints:
- Do not change [important behaviour].
- Do not rename [public methods/routes/classes].
- Do not add dependencies.
- Keep it suitable for new developers.

Expected output:
1. [Code / explanation / review]
2. [Risks]
3. [Tests]
4. [Manual verification steps]
```

---

# 2. Code explanation prompts

## Explain a Java service

```text
Explain this Spring Boot service class to beginner Java developers.

Focus on:
1. What each public method does
2. What data comes in
3. What data goes out
4. Where database access happens
5. Where validation happens
6. Which parts might be good candidates for refactoring

Do not rewrite the code yet.
```

## Explain a React component

```text
Explain this React component to beginner frontend developers.

Focus on:
1. What state values it stores
2. What props it receives
3. What events it handles
4. What API calls it triggers
5. What child components it renders
6. What logic could be extracted

Do not rewrite the component yet.
```

## Explain an error

```text
Explain this error message in simple terms.

Then provide:
1. Likely cause
2. Files I should inspect
3. Minimal fix
4. How to confirm the fix worked

Do not suggest a full rewrite unless necessary.
```

---

# 3. Bug-finding prompts

## General bug review

```text
Review this code for possible bugs.

Rules:
- Do not rewrite the full file.
- List only real or likely issues.
- Separate critical bugs from minor improvements.
- For each issue, explain cause, impact and fix.
- Mention if more context is needed.
```

## Frontend bug review

```text
Review this React component for possible UI or state bugs.

Focus on:
1. Loading states
2. Error states
3. Stale data
4. Missing dependencies in useEffect
5. Incorrect controlled inputs
6. Accessibility problems

Do not change styling unless it is necessary for accessibility.
```

## Backend bug review

```text
Review this Spring Boot service/controller code for possible backend bugs.

Focus on:
1. Null handling
2. Duplicate checks
3. Validation gaps
4. Wrong HTTP status behaviour
5. Security assumptions
6. Repository method usage

Do not change public API behaviour.
```

---

# 4. Backend refactoring prompts

## Spring Boot service refactor

```text
I am working on a Spring Boot service class in an Asset Tracker API.

Task:
Refactor this service to improve readability and reduce duplication.

Constraints:
- Do not change public method names.
- Do not change controller endpoints.
- Do not change DTO fields.
- Do not change repository method names.
- Do not change exception types.
- Do not add dependencies.
- Keep it understandable for beginner Java developers.

Return:
1. Refactored code
2. Explanation of helper methods created
3. Risks introduced
4. HTTP requests I should run to verify behaviour
```

## Extract private helper methods

```text
Identify repeated logic in this Java class and suggest private helper methods.

Rules:
- Do not change public methods.
- Do not change behaviour.
- Do not change exception messages.
- Give method names that clearly describe their purpose.
- Explain why each helper method is useful.
```

## Refactor without changing API

```text
Refactor this code internally only.

Do not change:
- Endpoint URLs
- Request DTOs
- Response DTOs
- HTTP status codes
- Exception types
- Security rules

After refactoring, list exactly what stayed the same.
```

---

# 5. Frontend refactoring prompts

## React form validation extraction

```text
I have a React form wizard used to create and edit assets.

Task:
Move validation logic into a separate utility file.

Constraints:
- Keep the same UI.
- Keep the same CSS class names.
- Keep the same form fields.
- Keep the same submit payload.
- Keep the same route paths.
- Do not add new libraries.

Return:
1. Updated component
2. New utility file
3. Tests for the validation utility
4. Explanation of what stayed the same
5. Risks to manually verify
```

## React component readability

```text
Improve the readability of this React component.

Constraints:
- Do not change UI behaviour.
- Do not change CSS classes.
- Do not change route paths.
- Do not change API calls.
- Prefer small helper functions instead of a large rewrite.

Return a short explanation before the code.
```

## React state review

```text
Review this React component's state management.

Focus on:
1. State values that might be derived instead of stored
2. Missing loading or error states
3. useEffect dependency issues
4. Unclear event handlers
5. Opportunities to extract utility functions

Do not rewrite yet. Give recommendations first.
```

---

# 6. Test-generation prompts

## Vitest utility tests

```text
Generate Vitest tests for this validation function.

Cover:
- Valid input
- Missing required fields
- Invalid formats
- Edge cases
- Different form modes if applicable

Keep the tests readable for beginner React developers.
```

## React Testing Library tests

```text
Generate React Testing Library tests for this component.

Focus on user-visible behaviour:
- What text appears
- Which validation errors appear
- Which button becomes disabled
- What happens when the user submits

Avoid testing internal implementation details.
```

## Playwright E2E test prompt

```text
Generate a Playwright smoke test for this app flow:

1. Open login page
2. Login as seeded admin
3. Confirm protected dashboard loads
4. Navigate using the main navigation
5. Open the create form
6. Submit a valid record
7. Confirm success message appears

Requirements:
- Use role-based locators.
- Scope navigation links to the main navigation.
- Avoid fragile exact text where the app uses dynamic names.
```

## Test hardening prompt

```text
Review these tests and tell me if they are too weak.

For each weak test:
1. Explain why it is weak
2. Suggest a stronger assertion
3. Explain what bug the stronger assertion would catch
```

---

# 7. Security and safety prompts

## Secret scanning prompt

```text
Review this code snippet for accidental secrets or sensitive data.

Look for:
- API keys
- JWT tokens
- passwords
- database connection strings
- private URLs
- personal data

Do not repeat any secret value in your answer. Just identify the line and risk.
```

## Auth flow review prompt

```text
Review this frontend auth flow.

Focus on:
1. How token is stored
2. What happens when token expires
3. What happens on 401
4. What happens on 403
5. Whether protected routes only check frontend state or also rely on backend security

Give practical improvement suggestions.
```

## Backend security review prompt

```text
Review these Spring Security rules.

Explain:
1. Which endpoints are public
2. Which endpoints require USER
3. Which endpoints require ADMIN
4. What request should return 401
5. What request should return 403
6. Any rule that looks too broad
```

---

# 8. Documentation prompts

## Before/after rationale

```text
Write a before/after refactor rationale for this change.

Include:
1. What the code looked like before
2. What changed
3. Why the change improves maintainability
4. What behaviour should remain unchanged
5. What tests were run
6. Any risk or follow-up
```

## Student explanation prompt

```text
Explain this refactor for beginner developers.

Use simple language and include:
1. The problem in the original code
2. The refactor idea
3. Why it is safer to keep public methods unchanged
4. Why tests matter after refactoring
```

## Pull request summary prompt

```text
Write a short pull request summary for this refactor.

Sections:
- Summary
- What changed
- What did not change
- Testing evidence
- Risks
```

---

# 9. AI output review prompts

## Review previous answer

```text
Review your previous answer.

Check:
1. Did you change any public API behaviour?
2. Did you rename any function used by another file?
3. Did you add a new dependency?
4. Did you remove validation?
5. Did you weaken security?
6. Did you invent any unavailable method?
7. What should I manually verify before accepting this code?
```

## Compare generated code to constraints

```text
Compare your generated code against my constraints.

Create a table with:
- Constraint
- Did you follow it?
- Evidence
- Any concern
```

## Risk analysis prompt

```text
List the risks introduced by this refactor.

Group them as:
1. Compile-time risks
2. Runtime risks
3. Behaviour-change risks
4. Testing gaps
5. Security risks
```

---

# 10. Support Desk student prompts

## TicketService refactor prompt

```text
I am working on a Spring Boot Support Desk Ticket API.

Task:
Refactor TicketService to improve readability and reduce duplication.

Constraints:
- Do not change public method names.
- Do not change endpoint URLs.
- Do not change TicketResponse fields.
- Do not change validation rules.
- Do not change exception types.
- Do not add dependencies.

Return:
1. Refactored code
2. Explanation of helper methods
3. Tests or HTTP requests to run
4. Risks introduced
```

## Ticket form validation prompt

```text
I have a React TicketFormWizard component.

Task:
Extract validation logic into ticketFormValidation.js.

Fields:
- title
- description
- category
- priority
- status

Constraints:
- Keep the UI the same.
- Keep CSS classes the same.
- Keep API payload the same.
- Do not add libraries.

Return:
1. Updated component
2. New validation utility
3. Vitest tests
4. Manual checks
```

## Ticket test prompt

```text
Generate Vitest tests for ticketFormValidation.js.

Cover:
- valid ticket
- missing title
- missing description
- missing category
- invalid priority
- invalid status

Keep test names clear for beginner developers.
```

---

# 11. Reflection prompts

Use these at the end of Day 16:

```text
1. What prompt produced the best result today?
2. What did AI get wrong or miss?
3. What constraint was most important?
4. Which test gave you the most confidence?
5. What would you never paste into an AI tool?
6. How did tests help you trust or reject the refactor?
```
