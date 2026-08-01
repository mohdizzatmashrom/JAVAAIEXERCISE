# Day 3 Exercise 01 - Build and Trace the Code Flow

## Why you are doing this

On Day 2, the code became more structured. Instead of putting everything in `Main.java`, the project now has:

```text
model       -> stores the shape of the data
repository  -> stores and retrieves data
service     -> controls business actions
exception   -> handles error situations
```

This Exercise helps you understand how one simple action moves through the files.

The main idea is:

```text
Demo class
  -> CourseService
      -> CourseRepository
          -> InMemoryCourseRepository
              -> LinkedHashMap
```

## What you will write

You will create a new demo class and write code that:

1. Creates a repository.
2. Creates a service.
3. Adds a new course using the service.
4. Retrieves the same course using the service.
5. Prints the result.
6. Writes comments explaining the flow.

## File to create

Create this file:

```text
src/main/java/com/fullstack/demo/CodeFlowPractice.java
```

Use this package at the top:

```java
package com.fullstack.demo;
```

## Imports you will need

```java
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
```

## Task A - Create the repository and service

Inside `main`, write the code to create the repository and service.

Expected idea:

```java
CourseRepository courseRepository = new InMemoryCourseRepository();
CourseService courseService = new CourseService(courseRepository);
```

Then add comments above both lines explaining:

```text
Why do we create the repository first?
Why does CourseService need CourseRepository?
```

## Task B - Create one new course

Create this course:

```text
Course ID: C004
Title: Spring Boot API Development
Duration: 18
Level: Intermediate
```

Then save it using:

```java
courseService.createCourse(...);
```

Do not save it directly using the repository for this Exercise.

## Task C - Retrieve the course by ID

Use:

```java
courseService.getCourseById("C004");
```

Store the returned course in a variable and print it using:

```java
printSummary();
```

## Task D - Add trace comments

Add comments in your demo class that explain this flow:

```text
1. Demo class calls CourseService.
2. CourseService validates the course.
3. CourseService asks CourseRepository to save or find the course.
4. InMemoryCourseRepository stores the course in memory.
5. Course object is returned to the demo class.
```

## Expected output

Your output should include the Spring Boot course details.

Example:

```text
=== Add and Find Course ===
Course ID: C004
Title: Spring Boot API Development
Duration: 18 hours
Level: Intermediate
Instructor: Not assigned yet
```

The exact formatting can be different as long as the course details are shown.

## Common mistakes to avoid

Do not write this:

```java
Course course = courseRepository.findById("C004");
```

`findById()` returns an `Optional<Course>`, not a direct `Course`.

For this Exercise, use the service:

```java
Course course = courseService.getCourseById("C004");
```

## Submission checklist

Submit evidence that:

- [ ] `CodeFlowPractice.java` exists.
- [ ] Repository and service are created correctly.
- [ ] Course `C004` is created through `CourseService`.
- [ ] Course `C004` is retrieved through `CourseService`.
- [ ] Course details are printed.
- [ ] Your code contains trace comments explaining the flow.
- [ ] Code compiles and runs.

## README reflection

Answer this in your README:

```text
When getCourseById("C004") is called, which file does the request go to first, second, and third?
```
