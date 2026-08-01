# Day 8 Exercise 5: Query Behaviour and Troubleshooting

## Objective

Test how your Support Desk Ticket API behaves when users send unusual, incorrect, or edge-case query requests.

## Background

Real API users do not always send perfect requests.

They may:

* use the wrong status value
* request a page that has no data
* sort by the wrong field
* use a very large page size
* combine filters in a way your API does not fully support yet

As a backend developer, you must understand how your API behaves in these situations.

This exercise is not mainly about writing new features. It is about testing, observing, explaining, and thinking like a backend developer.

---

## Task

Add the following unusual query requests to your Day 8 `.http` file.

Run each request and record what happens.

You do not need to fix every issue today. The goal is to understand the current API behaviour and identify what could be improved later.

---

## Test 1: Invalid Status Value

```http
GET http://localhost:8080/api/tickets?status=INVALID
```

Observe:

* Does the API return an empty list?
* Does it return an error?
* What log message appears in the terminal?

---

## Test 2: Invalid Priority Value

```http
GET http://localhost:8080/api/tickets?priority=URGENT
```

Observe:

* Does your API support this priority?
* What response is returned?
* Should the API accept this value?

---

## Test 3: Page Number with No Records

```http
GET http://localhost:8080/api/tickets/paged?page=99&size=5
```

Observe:

* Does the API crash?
* Does it return an empty page?
* What does the page metadata show?

---

## Test 4: Very Large Page Size

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=100
```

Observe:

* Does the API allow this?
* Should real APIs allow very large page sizes?
* What could go wrong if the page size is too large?

---

## Test 5: Unknown Sort Field

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=5&sortBy=unknownField&direction=asc
```

Observe:

* Does the API return data?
* Does the sorting seem meaningful?
* Should the backend validate allowed sort fields?

---

## Test 6: Combined Filters

```http
GET http://localhost:8080/api/tickets?status=OPEN&priority=HIGH
```

Observe:

* Does your API apply both filters?
* Does it only apply one filter?
* Is this behaviour clear to the API user?

---

## Reflection Questions

Answer the following questions:

1. What happened when you used an invalid status?
2. What happened when you used an invalid priority?
3. What happened when you requested page 99?
4. What happened when you used an unknown sort field?
5. Why should an API limit page size?
6. Why should an API validate sort fields?
7. Does your current API support combined filters?
8. What log messages helped you understand what happened?
9. Which behaviour would you improve in a future version?

---

## Expected Learning

By the end of this exercise, you should understand that API development is not only about successful requests.

A good backend developer must also think about:

* invalid input
* edge cases
* unexpected query values
* clear API behaviour
* useful logs
* future improvements

---

## Submission

Submit:

1. Updated Day 8 `.http` file
2. Results from at least five unusual query requests
3. Short answers to the reflection questions
4. (Optional) What you would improve in the API later.
