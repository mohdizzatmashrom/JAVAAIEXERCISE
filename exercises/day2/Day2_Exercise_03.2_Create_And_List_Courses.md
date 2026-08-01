# Day 2 Exercise 03.2 - Create and List Courses

## Goal

Add basic course creation and listing methods to `CourseService`.

This is the first point where your service class starts doing useful work.

## Starting Point

You should already have:

```java
private final CourseRepository courseRepository;

public CourseService(CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
}
```

## Required Imports

Add the imports needed for:

```java
Course
List
InvalidCourseException
```

## Methods to Add

Add these methods to `CourseService`:

```java
public Course createCourse(Course course)
```

```java
public List<Course> getAllCourses()
```

## Behaviour

### createCourse

The method should:

1. Check that the course is not `null`
2. If the course is `null`, throw `InvalidCourseException`
3. Save the course using `courseRepository.save(course)`
4. Return the saved course

### getAllCourses

The method should:

1. Call `courseRepository.findAll()`
2. Return the list of courses

## Main Demo Task

Create or update:

```text
CourseServiceDemo.java
```

In the demo file:

1. Create a `CourseRepository`
2. Create a `CourseService`
3. Create at least three courses
4. Save the courses using `createCourse`
5. Print the result of `getAllCourses`

## Suggested Demo Flow

```text
=== Create Courses ===
Course saved: C001
Course saved: C002
Course saved: C003

=== All Courses ===
C001 - Java Fundamentals
C002 - React Frontend Development
C003 - MongoDB Basics
```

## Learning Focus

By completing this exercise, you should understand:

- How the service calls the repository
- How to save data through a service method
- How to return a list of records
- Why validation should happen before saving

## Checkpoint

Test these cases:

1. Create a valid course
2. Create three valid courses
3. Print all courses
4. Try passing `null` into `createCourse`

## Submission

Submit:

1. Updated `CourseService.java`
2. `CourseServiceDemo.java`
3. Screenshot of output
4. GitHub commit link or screenshot
