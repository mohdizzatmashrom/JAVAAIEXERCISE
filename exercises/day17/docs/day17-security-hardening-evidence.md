# Day 17 Security Hardening Evidence

Complete this document during the lab.

## 1. Authentication evidence

Test performed:

```http
GET /api/v1/assets without token
```

Expected result:

```text
401 Unauthorized
```

Evidence:

```text
Paste result or screenshot reference here.
```

## 2. Authorisation evidence

Test performed:

```text
Non-admin user tries admin-only create/update action.
```

Expected result:

```text
403 Forbidden
```

Evidence:

```text
Paste result or screenshot reference here.
```

## 3. Duplicate protection evidence

Test performed:

```text
Create asset using an existing assetTag or serialNumber.
```

Expected result:

```text
409 Conflict
```

Evidence:

```text
Paste result or screenshot reference here.
```

## 4. Input validation evidence

Test performed:

```text
Send invalid pagination or invalid required fields.
```

Expected result:

```text
400 Bad Request
```

Evidence:

```text
Paste result or screenshot reference here.
```

## 5. Logging evidence

Confirm logs do not show:

- Passwords
- JWT tokens
- Full Authorization headers
- Secret keys

Evidence:

```text
Paste safe log examples here.
```

## 6. Docker secret hygiene evidence

Confirm these files are not committed:

- `.env`
- `secrets/`
- private key files

Evidence:

```bash
git status
```
