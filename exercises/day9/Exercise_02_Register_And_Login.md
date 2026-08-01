# Day 9 Exercise 2 - Register and Login

## Scenario

Users should be able to register and login before using the Ticket API.

## Task

Create authentication DTOs, service, and controller.

## Create DTOs

Create:

```text
RegisterRequest.java
LoginRequest.java
AuthResponse.java
```

## Create service

Create:

```text
AuthService.java
JwtService.java
```

## Create controller

Create:

```text
AuthController.java
```

## Required endpoints

```http
POST /api/auth/register
POST /api/auth/login
```

## Register rules

When registering:

```text
1. Trim and lowercase email
2. Check duplicate email
3. Hash password
4. Save user with role USER
5. Return JWT response
```

## Login rules

When logging in:

```text
1. Check email and password
2. Return JWT if valid
3. Return 401 if invalid
```

## Submission

Submit working screenshots or copied HTTP output for:

```text
Register success
Login success
Duplicate email error
Wrong password error
```
