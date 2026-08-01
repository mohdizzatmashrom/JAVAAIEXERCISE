# Support Desk UI

Day 11 React Fundamentals exercise.

## Component Tree

```
App
├── Layout
│   └── AppHeader
├── ApiInfoCard
└── TicketDashboard
    ├── TicketFilterPanel (search + status + priority dropdowns)
    └── TicketList
    │   ├── PriorityBadge
    │   └── StatusBadge
    └── TicketDetail
        ├── PriorityBadge
        └── StatusBadge
```

## Reflection Answers

**1. Which component owns the selected ticket state?**

The `App` component owns the selected ticket state using `useState`. It stores `selectedId` and passes it down to `TicketList` along with an `onSelect` callback, and passes the resolved `selectedTicket` object to `TicketDetail`.

**2. Which components receive props?**

- `Layout` — receives `children`
- `TicketFilterPanel` — receives `searchText`, `onSearchChange`, `statusFilter`, `onStatusChange`, `priorityFilter`, `onPriorityChange`
- `TicketList` — receives `tickets`, `selectedId`, `onSelect`
- `TicketDetail` — receives `ticket`
- `PriorityBadge` — receives `priority`
- `StatusBadge` — receives `status`

**3. What does `useEffect` do in your app?**

`useEffect` in `ApiInfoCard` fetches the backend API info (`/api/v1/info`) when the component mounts. It manages loading, error, and success states based on the fetch result, and uses a cleanup flag (`cancelled`) to avoid updating state on an unmounted component.

**4. What loading state did you create?**

While the API info is being fetched, the `ApiInfoCard` shows a "Loading API info..." message inside a neutral-styled card. The `loading` state is `true` by default and set to `false` after the fetch completes or fails.

**5. What error state did you create?**

If the backend is unreachable or the fetch fails, the `ApiInfoCard` shows a red error card displaying the error message and a hint to ensure the Spring Boot backend is running on port 8080.

**6. What would change when you connect this UI to the protected backend API later?**

- Add a login/register form and store the JWT token in state or localStorage.
- Include an `Authorization: Bearer <token>` header in all API fetch calls.
- Replace local `sampleTickets` data with `fetch('/api/v1/tickets')` calls using the token.
- Add route protection to redirect unauthenticated users to a login page.
- Handle 401/403 responses by clearing the token and prompting re-login.
