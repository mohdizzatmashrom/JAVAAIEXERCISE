# D11 Exercise 04 — State, Search and Filter

## Goal

Use state to control search and filter UI.

## Create component

```text
src/components/TicketFilterPanel.jsx
```

## Requirements

Add:

- Search input
- Status dropdown
- Priority dropdown

For Day 11, you may filter by one or more fields.

Minimum requirement:

```text
Search by title or category
Filter by status
```

## Teaching hint

Your inputs should be controlled inputs.

Example:

```jsx
<input
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>
```

## Submit

Screenshot showing filtered ticket results.
