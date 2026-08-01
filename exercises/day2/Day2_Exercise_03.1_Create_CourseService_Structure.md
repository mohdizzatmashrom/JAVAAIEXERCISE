# Day 2 Exercise 03.1 - Create the CourseService Structure

## Goal

Create the basic `CourseService` class structure.

This exercise introduces the **service layer**. The service layer will sit between `Main.java` and the repository.

```text
Main.java
   ↓
CourseService
   ↓
CourseRepository
```

## Before You Start

Your project should already have these files from the previous exercises:

```text
Course.java
Instructor.java
CourseRepository.java
InvalidCourseException.java
DuplicateCourseException.java
CourseNotFoundException.java
```

## New File to Create

Create:

```text
src/main/java/com/fullstack/demo/service/CourseService.java
```

Use this package:

```java
package com.fullstack.demo.service;
```

## Required Imports

Add the imports needed for:

```java
CourseRepository
```

## Task

Create a `CourseService` class with:

1. A private final `CourseRepository` field
2. A constructor that receives a `CourseRepository`
3. No business methods yet

## Required Structure

Your class should follow this structure:

```java
package com.fullstack.demo.service;

import com.fullstack.demo.repository.CourseRepository;

public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
}
```

## Learning Focus

By completing this exercise, you should understand:

- What a service class is
- Why the service class uses a repository
- Why constructor injection is useful
- Why we separate business logic from `Main.java`

## Checkpoint

Your project should compile successfully.

You do not need to run any course logic yet because this exercise only creates the service structure.

## Submission

Submit:

1. `CourseService.java`
2. Screenshot showing that the project compiles
3. GitHub commit link or screenshot
