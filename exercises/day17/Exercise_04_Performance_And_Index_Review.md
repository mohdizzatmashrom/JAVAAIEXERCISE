# D17 Exercise 04 — Performance and Index Review

## Goal

Review which fields should be indexed in the Support Desk project.

## Think about

- ticket number
- status
- priority
- category
- createdBy
- createdAt

## Tasks

1. List fields used for filtering.
2. List fields used for sorting.
3. List fields that should be unique.
4. List fields used in reports.
5. Use Compass or mongosh to check current indexes.

## Submission

Submit your index tuning notes.

---

## Index Tuning Notes

### Task 1 — Fields Used for Filtering

| Field | Where Used | How |
|---|---|---|
| `status` | `GET /api/v1/tickets?status=OPEN`, `GET /api/v1/tickets/paged?status=OPEN` | Exact-match filter via `findByStatus()` and `Criteria.where("status").is(...)` |
| `priority` | `GET /api/v1/tickets?priority=HIGH` | Exact-match filter via `findByPriority()` |
| `category` | `GET /api/v1/tickets?category=Email` | Exact-match filter via `findByCategory()`; also partial-match via `searchText` regex in paged endpoint |
| `title` | `GET /api/v1/tickets/paged?searchText=...` | Case-insensitive regex match inside `searchText` (OR-ed with `category`) |
| `createdBy` | Indexed on model but **not** exposed as a query parameter in any controller yet |

### Task 2 — Fields Used for Sorting

| Field | Where Used | How |
|---|---|---|
| `createdAt` | Default `sortBy` in paged endpoint (`GET /api/v1/tickets/paged?sortBy=createdAt&direction=desc`) | `Sort.by("createdAt")` ascending or descending |
| `title` | Optional `sortBy` in paged endpoint (`sortBy=title&direction=asc`) | `Sort.by("title")` ascending or descending |
| `priority` | Optional `sortBy` in paged endpoint (`sortBy=priority`) | `Sort.by("priority")` ascending or descending |
| `status` | Optional `sortBy` in paged endpoint (`sortBy=status`) | `Sort.by("status")` ascending or descending |

### Task 3 — Fields That Should Be Unique

| Field | Unique? | Reasoning |
|---|---|---|
| `id` | **Yes** (automatic) | MongoDB `_id` field is always unique by default. |
| All other fields | **No** | Multiple tickets can share the same `status`, `priority`, `category`, `createdBy`, `title`, or `createdAt`. There is no business requirement for any other field to be unique. |

### Task 4 — Fields Used in Reports

| Field | Report Method | Aggregation |
|---|---|---|
| `status` | `TicketReportService.countTicketsByStatus()` | `Aggregation.group("status").count()` |
| `priority` | `TicketReportService.countTicketsByPriority()` | `Aggregation.group("priority").count()` |

### Task 5 — Current Indexes

The `Ticket` model (`src/main/java/com/example/supportdesk/model/Ticket.java`) declares `@Indexed` on five fields. Combined with the default `_id` index, the current indexes in the `tickets` collection are:

| Index Name | Field(s) | Type | Source |
|---|---|---|---|
| `_id_` | `_id` | Single field, ascending | MongoDB default (always present) |
| `category_1` | `category` | Single field, ascending | `@Indexed` on `Ticket.category` |
| `priority_1` | `priority` | Single field, ascending | `@Indexed` on `Ticket.priority` |
| `status_1` | `status` | Single field, ascending | `@Indexed` on `Ticket.status` |
| `createdBy_1` | `createdBy` | Single field, ascending | `@Indexed` on `Ticket.createdBy` |
| `createdAt_1` | `createdAt` | Single field, ascending | `@Indexed` on `Ticket.createdAt` |

Auto-index creation is enabled in `application.properties`:

```properties
spring.data.mongodb.auto-index-creation=true
```

To verify in `mongosh`:

```javascript
use support_desk_db
db.tickets.getIndexes()
```

### Index Tuning Recommendations

1. **Current coverage is good.** All five `@Indexed` fields align with the fields used for filtering, sorting, and reporting. Every exact-match query (`findByStatus`, `findByPriority`, `findByCategory`) and every sort (`createdAt`, `title`, `priority`, `status`) benefits from an index.

2. **`title` is NOT indexed but is used in regex search.** The `searchText` parameter runs a case-insensitive regex on `title` and `category`. Regex queries on unindexed fields require a full collection scan. For a small dataset this is acceptable, but if the ticket count grows, consider adding a text index or a wildcard index on `title`.

3. **Compound index for combined filter + sort.** The paged endpoint often filters by `status` AND sorts by `createdAt`. A compound index `{ status: 1, createdAt: -1 }` would allow MongoDB to satisfy both the filter and the sort from the index alone (an "index-only scan"), avoiding an in-memory sort stage.

4. **`createdBy` index is low-value for now.** No controller endpoint currently filters by `createdBy`. The index is harmless at small scale but could be removed if write performance becomes a concern. If a "my tickets" feature is added later, the index will become valuable.

5. **No unique constraints needed** beyond `_id`. Tickets are not assigned unique ticket numbers in the current model, and no business rule requires uniqueness on any other field.

6. **Text index consideration.** If full-text search across `title`, `description`, and `category` is needed in the future, a MongoDB text index (`{ title: "text", description: "text", category: "text" }`) would be more efficient than the current regex approach. However, a collection can only have one text index, and text indexes are larger and slower to maintain.
