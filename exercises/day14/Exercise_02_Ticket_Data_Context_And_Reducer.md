# Day 14 Exercise 2 - Ticket Data Context And Reducer

## Scenario

Ticket list data will be used by several components. Move ticket list state into a shared context.

## Task

Create:

```text
src/context/TicketDataContext.jsx
```

Use `useReducer` to manage:

- tickets
- selected ticket id
- loading state
- error state
- page information
- filters

## Required actions

```text
LOAD_START
LOAD_SUCCESS
LOAD_ERROR
SET_SEARCH_TEXT
SET_STATUS_FILTER
SELECT_TICKET
```

## Expected result

The ticket page should get data and actions from `useTicketData()`.
