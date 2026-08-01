# Day 9 Exercise 4 - Seed an Admin User

## Scenario

A normal registration creates a USER account.

But the trainer needs an ADMIN account to test role-based access.

## Task

Create a `UserDataSeeder` class.

## Requirements

Seed one admin user:

```text
Name: Admin User
Email: admin@example.com
Password: Admin@12345
Role: ADMIN
```

The password must be hashed before saving.

## Important

The seeder should not create the same admin user every time the app restarts.

Use:

```java
existsByEmailIgnoreCase(...)
```

## Submission

Submit:

```text
UserDataSeeder.java
Screenshot of successful admin login
```
