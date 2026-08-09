# Day 16 Backend Refactor Rationale

## File changed

`src/main/java/com/example/assettracker/service/AssetService.java`

## Goal

Improve readability and maintainability without changing API behaviour.

## What changed

- Repeated duplicate-checking logic was extracted into private helper methods.
- Asset lookup logic was extracted into `findAssetOrThrow`.
- Required string trimming was extracted into `normalizeRequired`.
- Optional string handling was kept in `normalizeOptional`.
- Status normalization and validation was extracted into `normalizeStatus`.

## What did not change

- Public method names remain the same.
- Endpoint behaviour remains the same.
- Duplicate asset tags still return conflict.
- Duplicate serial numbers still return conflict.
- Invalid statuses still return bad request.
- GET, POST and PUT endpoints still return the same response DTOs.

## Before/after teaching point

Before refactor, `createAsset` and `updateAsset` contained several low-level details in the same method.
After refactor, the public service methods read more like business workflows.

## Validation required

Run the existing HTTP requests and frontend tests after the refactor. Refactoring is only successful if behaviour stays the same.

---

# Regression check

This refactor must not change existing behaviour. After applying it, verify:

```text
- existing tests still pass
- login still works
- protected API calls still include the bearer token
- form validation behaviour is unchanged
- optimistic update UI still shows only one active status button
```
