# D18 Exercise 04 — Environment and Secrets

Create `.env.example`.

Include placeholders for:

- JWT secret
- frontend port
- backend port
- Mongo host port

Explain why `.env` should not be committed.

Best practice:Commit only .env.example with safe placeholder values (like REPLACE_WITH_A_LONG_RANDOM_STRING_AT_LEAST_32_BYTES). Each developer copies it to .env locally and fills in their own real values. The .gitignore rule .env ensures the
real file is never tracked
