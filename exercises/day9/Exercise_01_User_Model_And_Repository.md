# Day 9 Exercise 1 - Create User Model and Repository

## Scenario

Your Support Desk Ticket API now needs login functionality.

Before users can login, the backend needs a user document in MongoDB.

## Task

Create a user model for your Support Desk API.

## Requirements

Create:

```text
model/AppUser.java
repository/AppUserRepository.java
```

Your `AppUser` should contain:

```text
id
name
email
passwordHash
role
```

The `email` field should be unique.

## Repository methods

Add:

```java
Optional<AppUser> findByEmailIgnoreCase(String email);
boolean existsByEmailIgnoreCase(String email);
```

## Expected learning

You should understand:

```text
A user account is stored separately from a ticket.
Passwords should not be stored as plain text.
The repository can search users by email.
```

## Submission

Submit:

```text
AppUser.java
AppUserRepository.java
```
