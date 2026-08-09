# Day 16: AI-Assisted Coding, Prompt Engineering & Safe Refactoring

## What you will learn today

Today you will learn how to use AI as a software development assistant.

You are not using AI to replace your understanding. You are using AI to help you:

```text
Understand code
Improve code structure
Find possible bugs
Generate tests
Review your own work
Avoid breaking existing behaviour
```

The main lesson is:

```text
AI-assisted refactoring is only successful if the application still works afterwards.
```

---

# 1. What is AI-assisted coding?

AI-assisted coding means using tools such as ChatGPT, Gemini Code Assist, GitHub Copilot, Claude, or similar tools to support development tasks.

AI can help with:

```text
Explaining unfamiliar code
Suggesting refactors
Finding repeated logic
Generating tests
Creating documentation
Suggesting possible bugs
Improving error messages
```

AI is not good at:

```text
Knowing your full project context automatically
Guaranteeing code is correct
Protecting your secrets automatically
Understanding every business rule
Replacing your own testing and review
```

Important rule:

```text
AI can suggest code, but you are responsible for the final code.
```

---

# 2. What is refactoring?

Refactoring means improving the internal structure of code without changing what the application does.

## Refactoring changes the inside

Example:

```text
Large method → smaller helper methods
Repeated code → reusable function
Mixed validation logic → separate validation utility
Unclear names → clearer names
```

## Refactoring should not change the outside

After refactoring:

```text
The same buttons should work
The same API endpoints should work
The same validation rules should apply
The same tests should pass
The same user behaviour should remain
```

Simple definition:

```text
Refactoring makes the code easier to maintain without changing behaviour.
```

---

# 3. Prompt engineering for developers

A good coding prompt gives the AI enough information to produce useful and safe output.

Use this structure:

```text
Context + Task + Constraints + Expected Output + Tests + Review
```

## What each part means

| Part | What it means | Example |
|---|---|---|
| Context | Tell AI what project/file/framework this is | “This is a React form wizard for an asset tracking app.” |
| Task | Tell AI what you want | “Move validation into a separate utility file.” |
| Constraints | Tell AI what must not change | “Do not change CSS classes or API payload.” |
| Expected Output | Tell AI how to answer | “Return changed files only.” |
| Tests | Ask how to verify the change | “Generate Vitest tests for the validation function.” |
| Review | Ask AI to check risks | “List possible regressions.” |

---

# 4. Bad prompt vs better prompt

## Bad prompt

```text
Fix my code.
```

This is weak because it gives no context, no constraints, and no expected result.

## Better prompt

```text
I am working on a React form wizard for an Asset Tracker app.

The form currently has validation logic inside the component.
Refactor the code by moving validation into a separate utility file.

Constraints:
- Do not change the UI layout.
- Do not change CSS class names.
- Do not change form field names.
- Do not change the API payload.
- Do not add new libraries.

Return:
1. Updated component code
2. New validation utility file
3. Vitest tests for the validation function
4. Explanation of what behaviour stayed the same
```

Why this is better:

```text
It gives project context.
It defines a specific task.
It protects existing behaviour.
It asks for tests.
It asks for explanation.
```

---

# 5. Safety rules when using AI tools

Never paste the following into AI tools unless your instructor or organisation clearly allows it:

```text
Passwords
JWT tokens
API keys
Database usernames/passwords
Private customer data
Production database exports
Confidential company code
NDA-protected material
Exam answers or restricted assessment content
```

Safe alternative:

```text
Use simplified sample code.
Remove secrets.
Replace real names with fake names.
Describe the issue without exposing private data.
```

Example:

Instead of pasting:

```text
mongodb+srv://realUser:realPassword@realCluster...
```

Use:

```text
mongodb+srv://<username>:<password>@<cluster-url>
```

---

# 6. The AI-assisted workflow

Use this workflow today:

```text
Generate → Explain → Test → Review
```

## Step 1: Generate

Ask AI for a small, controlled change.

Example:

```text
Refactor this method to reduce duplication. Do not change behaviour.
```

## Step 2: Explain

Ask AI to explain the change.

Example:

```text
Explain what changed and why it improves readability.
```

## Step 3: Test

Ask AI how to verify the change.

Example:

```text
What tests should I run to prove the behaviour is unchanged?
```

## Step 4: Review

Ask AI to identify risks.

Example:

```text
What could break because of this refactor? What should I manually check?
```

---

# 7. Backend example: Refactoring a service class

In the Asset Tracker project, a service class may contain repeated logic such as:

```text
Find asset by ID
Check duplicate asset tag
Check duplicate serial number
Validate status
Trim required strings
Convert model to response DTO
```

A refactor can move some of this into helper methods.

Example helper methods:

```text
findAssetOrThrow()
ensureAssetTagIsUniqueForCreate()
ensureSerialNumberIsUniqueForCreate()
ensureAssetTagIsUniqueForUpdate()
ensureSerialNumberIsUniqueForUpdate()
normalizeRequired()
normalizeStatus()
```

## Why this helps

Instead of reading a long method and guessing what each section does, the method names explain the rules.

Example:

```text
ensureAssetTagIsUniqueForCreate()
```

This method name tells you:

```text
The rule checks asset tag uniqueness.
The rule applies when creating a new asset.
If the rule fails, the method should stop the operation.
```

---

# 8. Backend prompt example

Use this kind of prompt when asking AI to help with Java service refactoring:

```text
I am working on a Spring Boot service class for an Asset Tracker API.

Refactor this service to improve readability by extracting private helper methods.

Constraints:
- Do not change public method names.
- Do not change controller endpoints.
- Do not change DTOs.
- Do not change exception types.
- Do not change status values.
- Do not change duplicate checking behaviour.
- Keep the code suitable for students who are still learning Java.

Return:
1. Refactored code
2. Explanation of each helper method
3. Behaviour that must remain the same
4. Tests or HTTP requests I should run after refactoring
```

---

# 9. Frontend example: Extracting form validation

A React component can become too large when it handles too many responsibilities.

Example responsibilities inside one form component:

```text
Rendering UI
Tracking form state
Moving between wizard steps
Validating fields
Submitting to backend
Showing errors
Showing success messages
```

A useful refactor is to move validation into a separate utility file.

Example:

```text
frontend/src/utils/assetFormValidation.js
```

Then you can test the validation without rendering the whole form.

Example test file:

```text
frontend/src/utils/assetFormValidation.test.js
```

---

# 10. Frontend prompt example

```text
I have a React form wizard used to create and edit assets.

The validation logic is currently inside the component.
Refactor it by moving validation into a separate utility file.

Constraints:
- Do not change the UI layout.
- Do not change CSS class names.
- Do not change route paths.
- Do not change field names.
- Do not change the API payload structure.
- Do not add new libraries.
- Keep the component understandable for students.

Return:
1. Updated component code
2. New validation utility file
3. Vitest tests for the validation utility
4. Explanation of what behaviour stayed the same
```

---

# 11. Testing after AI-assisted refactoring

After a refactor, you should run tests.

For this project:

```bash
npm run test
npm run test:e2e
```

You should also manually check:

```text
Login works
Asset list loads
Create asset works
Edit asset works
Optimistic update works
Protected routes still work
Invalid form data still shows validation errors
```

---

# 12. Regression examples from our project

During the Day 16 refactor, we saw real regression risks.

## Example 1: Login request broke

Problem:

```text
The API client sent the request body incorrectly.
```

Fix:

```text
Convert request body using JSON.stringify.
Add Content-Type: application/json when a body exists.
```

Lesson:

```text
A cleaner API client is not useful if it breaks login.
```

## Example 2: Auth test broke

Problem:

```text
The mock auth session did not include expiresAt.
```

Lesson:

```text
When auth state changes, tests that create fake auth data must also be updated.
```

## Example 3: Asset test used broad text matching

Problem:

```text
LAP-2026-001 appeared in both the list and detail panel.
```

Better test:

```js
await screen.findByRole('button', { name: /LAP-2026-001/i })
```

Lesson:

```text
Good tests should find the specific element that represents the behaviour being tested.
```

## Example 4: GET request test was too strict

Problem:

```text
The test expected method: 'GET', but fetch uses GET by default.
```

Better test:

```js
const [url, options] = globalThis.fetch.mock.calls[0];

expect(url).toBe('/api/v1/assets/paged?page=0&size=5&sortBy=assetTag&direction=asc');
expect(options.method ?? 'GET').toBe('GET');
```

Lesson:

```text
Tests should check behaviour, not unnecessary implementation details.
```

---

# 13. Activity

You will apply AI-assisted refactoring to the Support Desk Ticket project.

Choose one:

```text
Option A: Refactor TicketService
Option B: Extract TicketForm validation
Option C: Improve tests for ticket filtering or form validation
```

## Your steps

1. Identify one part of the code that works but could be cleaner.
2. Write a first prompt.
3. Improve your prompt using context, task, constraints, expected output, tests, and review.
4. Use AI to suggest a change.
5. Review the suggestion before accepting it.
6. Apply only the parts you understand.
7. Run tests or manual checks.
8. Write a short before/after explanation.

---

# 14. Submission checklist

Submit or show:

```text
[ ] The code area you selected
[ ] Your first prompt
[ ] Your improved prompt
[ ] The refactored code
[ ] A short explanation of what changed
[ ] Tests or manual checks performed
[ ] One thing you rejected or changed from the AI suggestion
[ ] One risk you checked after refactoring
```

---

# 15. Reflection questions

Answer these at the end of the activity:

1. What did AI help you understand faster?
2. What did AI suggest that you had to check carefully?
3. What constraint was most important in your prompt?
4. How did you prove the refactor did not break behaviour?
5. What would you do differently in your next AI prompt?

---

# 16. One-page summary

Remember these rules:

```text
1. Give AI enough context.
2. Be specific about the task.
3. Add constraints to protect existing behaviour.
4. Ask for tests.
5. Ask AI to review its own answer.
6. Never paste secrets or private data.
7. Read the generated code before using it.
8. Run tests after refactoring.
9. Check the UI manually if behaviour matters.
10. You own the final code.
```

Final reminder:

```text
The goal is not to make AI write everything.
The goal is to become a better developer who can use AI carefully and professionally.
```
