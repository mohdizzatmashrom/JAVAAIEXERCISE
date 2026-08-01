# Day 2 Exercise 01 - Clean Up the Model Classes

## Goal

Improve yesterday's Java classes so they follow a clearer Java structure.

You will work on:

```text
Course.java
Instructor.java
Student.java
```

## Starting point

Use your Day 1 code.

Do not create a new project unless your trainer tells you to.

## Tasks

### Task 1 - Check your package

Make sure each class begins with:

```java
package com.fullstack.demo;
```

### Task 2 - Use private fields

Each class should use `private` fields.

Example:

```java
private String courseId;
private String title;
private int durationHours;
private String level;
```

### Task 3 - Use constructor

Each class must have a constructor that receives the required values.

Example:

```java
public Course(String courseId, String title, int durationHours, String level) {
    setCourseId(courseId);
    setTitle(title);
    setDurationHours(durationHours);
    setLevel(level);
}
```

### Task 4 - Add getters and setters

Use normal Java naming:

```java
getCourseId()
setCourseId(...)
getTitle()
setTitle(...)
getDurationHours()
setDurationHours(...)
```

For boolean fields later, use:

```java
isActive()
setActive(...)
```

### Task 5 - Add basic validation

Add simple validation inside setter methods.

Rules:

- ID cannot be blank
- name/title cannot be blank
- email cannot be blank
- duration must be more than 0

You may create a helper method like this:

```java
private static String requireText(String value, String fieldName) {
    if (value == null || value.isBlank()) {
        throw new IllegalArgumentException(fieldName + " is required.");
    }
    return value.trim();
}
```

### Task 6 - Add print methods

Add:

```java
printSummary()
```

for `Course`.

Add:

```java
printProfile()
```

for `Instructor` and `Student`.

## Expected output example

```text
Course ID: C001
Title: Java Fundamentals
Duration: 14 hours
Level: Beginner
Instructor: Not assigned yet
----------------------------
```

## Submission

Submit:

1. Updated `Course.java`
2. Updated `Instructor.java`
3. Updated `Student.java`
4. Screenshot of working output
5. GitHub commit link or screenshot
