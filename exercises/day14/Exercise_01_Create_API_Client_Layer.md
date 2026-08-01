# Day 14 Exercise 1 - Create API Client Layer

## Scenario

Your Support Desk frontend is starting to have many direct `fetch` calls. You will create one reusable API helper.

## Task

Create:

```text
src/services/httpClient.js
```

Add a function:

```js
apiRequest(path, options)
```

It should handle:

- request method
- JWT token header
- JSON request body
- JSON response parsing
- backend error messages

## Expected result

Page components should not manually repeat Authorization headers and JSON parsing logic.
