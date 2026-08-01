# Day 1 Exercise 02 - Improve the Course Class

## Learning Goal

Practise modifying a Java class by adding fields, updating constructors, and improving output formatting.

## Starting File

Edit:

```text
Course.java
```

## Tasks

Add two new fields to `Course.java`:

```java
private String category;
private boolean active;
```

Update the constructor so that every course has:

1. A category, for example `Programming`, `Frontend`, `Database`, or `Project`.
2. An active status, either `true` or `false`.

Update the `printSummary()` method so the output includes:

```text
Category: Programming
Status: Active
```

or:

```text
Status: Inactive
```

## Challenge

Do not print `true` or `false` directly. Print friendly text:

```text
Active
Inactive
```

## Submission Evidence

Submit:

1. Screenshot of updated course output.
2. GitHub commit link or screenshot.
3. Brief explanation of what changed in `Course.java`.
