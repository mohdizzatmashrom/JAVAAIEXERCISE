# Day 17 Performance and Index Tuning Notes

## Query fields used by the app

| Feature | Field(s) | Index needed? | Notes |
|---|---|---|---|
| Find by asset tag | `assetTag` | Yes | Should be unique |
| Find by serial number | `serialNumber` | Yes | Should be unique |
| Filter by status | `status` | Yes | Used in list and summary |
| Filter by category | `category` | Useful | Used in filtering/reporting |
| Filter by location | `location` | Useful | Used in filtering/reporting |
| Reports by status | `status` | Useful | Aggregation grouping field |
| Reports by category | `category` | Useful | Aggregation grouping field |
| Reports by location | `location` | Useful | Aggregation grouping field |

## Evidence to collect

Paste Compass or mongosh output showing indexes:

```text
Paste index list here.
```

## Timing examples

| Endpoint | Status | Duration | Interpretation |
|---|---:|---:|---|
| `/api/v1/assets/paged` | 200 | ___ ms | Normal / investigate |
| `/api/v1/reports/assets-by-status` | 200 | ___ ms | Normal / investigate |
| `/api/auth/login` | 200 / 401 | ___ ms | Auth path |
| `/api/readiness` | 200 / 503 | ___ ms | DB readiness |
```
