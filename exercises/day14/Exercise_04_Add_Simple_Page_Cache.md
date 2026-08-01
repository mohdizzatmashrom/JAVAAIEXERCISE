# Day 14 Exercise 4 - Add Simple Page Cache

## Scenario

If the user returns to a page they already loaded, the UI can reuse cached data.

## Task

Add an in-memory cache inside your ticket data reducer.

Suggested cache key:

```text
page|size|sortBy|direction
```

Requirements:

- First visit fetches from backend.
- Repeated visit loads from cache.
- Refresh button forces backend reload.
- Show a small message: `Loaded from cache` or `Fetched from backend`.

## Expected result

Students can explain cache hit and cache miss using the UI.
