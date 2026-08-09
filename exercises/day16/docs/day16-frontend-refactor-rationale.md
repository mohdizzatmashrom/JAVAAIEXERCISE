# Day 16 Frontend Refactor Rationale

## Files changed

- `frontend/src/components/AssetFormWizard.jsx`
- `frontend/src/utils/assetFormValidation.js`
- `frontend/src/utils/assetFormValidation.test.js`

## Goal

Move validation and formatting rules out of the component so they can be tested independently.

## What changed

- Form validation rules were extracted into `validateAssetFormStep`.
- Payload trimming/null conversion was extracted into `normalizeAssetFormPayload`.
- Review label formatting was extracted into `formatAssetFormLabel`.
- The wizard still controls form state, step movement and submit behaviour.

## What did not change

- The UI layout stays the same.
- Field names stay the same.
- Form steps stay the same.
- Validation messages stay the same.
- Create and update behaviour stay the same.

## Why this is useful

Validation logic is now easier to test with simple unit tests. Students can prove the refactor is safe without clicking through the full form every time.

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
