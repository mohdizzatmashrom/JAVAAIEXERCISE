# Day 3 Exercise 03 - Exception Practice with CourseService

## Why you are doing this

In beginner programs, it is common to print messages like:

```java
System.out.println("Course not found");
```

But in a service class, printing is not flexible enough.

A service should report that something went wrong. The caller decides what to do with that error.

Today, the caller is a console demo.
Later, the caller may be a Spring Boot REST controller.

## What you will write

You will create a demo class that intentionally searches for a missing course and catches the exception properly.

## File to create

Create:

```text
src/main/java/com/fullstack/demo/ExceptionPractice.java
```

## Imports you will need

```java
import com.fullstack.demo.exception.CourseNotFoundException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
```

## Task A - Set up CourseService

Inside `main`, create:

```java
CourseRepository courseRepository = new InMemoryCourseRepository();
CourseService courseService = new CourseService(courseRepository);
```

## Task B - Add two courses

Create and save two courses through `courseService.createCourse(...)`.

Use any two courses, for example:

```text
C001 - Java Fundamentals
C002 - React Frontend Development
```

## Task C - Find an existing course

Write code that finds `C001` and prints it.

This should work normally.

Example idea:

```java
Course course = courseService.getCourseById("C001");
course.printSummary();
```

## Task D - Find a missing course and catch the exception

Now search for:

```text
C999
```

Wrap it in `try/catch`:

```java
try {
    Course missingCourse = courseService.getCourseById("C999");
    missingCourse.printSummary();
} catch (CourseNotFoundException e) {
    System.out.println("Friendly message for user: " + e.getMessage());
}
```

## Task E - Add one more try/catch block

Call:

```java
courseService.getCourseById("C888");
```

Catch the exception and print a different friendly message, such as:

```text
Cannot display course details because the course does not exist.
```

## Expected output

Your program should:

1. Print the existing course.
2. Not crash when `C999` is missing.
3. Not crash when `C888` is missing.
4. Print friendly messages for missing courses.

## Common mistakes to avoid

Do not put this inside `CourseService`:

```java
System.out.println("Course not found");
```

The service should throw the exception. The demo class should catch and display it.

## Submission checklist

- [ ] `ExceptionPractice.java` exists.
- [ ] You created `CourseService` correctly.
- [ ] You added at least two courses.
- [ ] You successfully printed one existing course.
- [ ] You handled `C999` using `try/catch`.
- [ ] You handled another missing course ID using `try/catch`.
- [ ] Program does not crash.

## README reflection

Answer:

```text
Why is throwing CourseNotFoundException better than printing inside CourseService?
```

Use this hint:

```text
Console app, web API, and frontend app may all display the same error differently.
```
