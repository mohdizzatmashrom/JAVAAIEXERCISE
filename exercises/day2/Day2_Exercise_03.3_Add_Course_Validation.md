# Day 2 Exercise 03.3 - Add Course Validation

## Goal

Improve `CourseService` by moving validation logic into a private helper method.

At this stage, the service should protect the application from invalid course data.

## Starting Point

Your `CourseService` should already have:

```java
public Course createCourse(Course course)
```

```java
public List<Course> getAllCourses()
```

## Task

Create a private validation method:

```java
private void validateCourse(Course course)
```

Also create a helper method:

```java
private boolean isBlank(String value)
```

## Validation Rules

The service should reject a course if:

1. The course is `null`
2. Course ID is missing
3. Course title is missing
4. Duration is zero or less
5. Level is missing

Use `InvalidCourseException` with a clear message.

## Required Behaviour

Update `createCourse` so that it calls:

```java
validateCourse(course);
```

before saving the course.

## Example Error Messages

You may use messages like:

```text
Course cannot be null.
Course ID is required.
Course title is required.
Course duration must be greater than zero.
Course level is required.
```

## Main Task

Update `CourseServiceDemo.java`.

Test at least one valid course and at least three invalid courses.

Example invalid cases:

```text
Course with empty ID
Course with empty title
Course with duration 0
Course with empty level
```

## Suggested Flow

```text
=== Valid Course Test ===
Course saved successfully.

=== Invalid Course Test ===
Validation error: Course title is required.
```

## Learning Focus

By completing this exercise, you should understand:

- Why validation belongs in the service layer
- How private helper methods keep code cleaner
- How to use exceptions for invalid business data
- Why we validate before saving

## Checkpoint

Your validation should run before the course is saved.

If the course is invalid, it should not be added to the repository.

## Submission

Submit:

1. Updated `CourseService.java`
2. GitHub commit link and/or screenshot
