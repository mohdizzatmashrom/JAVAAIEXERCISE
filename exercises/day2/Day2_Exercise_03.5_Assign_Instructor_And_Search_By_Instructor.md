# Day 2 Exercise 03.5 - Assign Instructor and Search by Instructor

## Goal

Connect `Course` and `Instructor` objects through the service layer.

This exercise shows how objects can be related in a simple Java application.

## Starting Point

Your project should already have:

```text
Course.java
Instructor.java
CourseRepository.java
CourseService.java
```

Your `Course` class should support instructor Exercise using methods similar to:

```java
setInstructor(Instructor instructor)
getInstructor()
```

## Required Import

Add the import needed for:

```java
Instructor
```

## Methods to Add

Add these methods:

```java
public Course assignInstructor(String courseId, Instructor instructor)
```

```java
public List<Course> searchByInstructorName(String instructorName)
```

## Behaviour

### assignInstructor

The method should:

1. Find the course by ID
2. Assign the instructor to the course
3. Save the updated course
4. Return the updated course

Reuse this existing method:

```java
getCourseById(courseId)
```

### searchByInstructorName

The method should:

1. Accept an instructor name
2. Treat `null` input as an empty string
3. Search all courses
4. Ignore courses that have no instructor
5. Return courses where the instructor name contains the search text
6. Ignore uppercase/lowercase differences


## Learning Focus

By completing this exercise, you should understand:

- How one object can contain another object
- How to update an existing course
- Why the service reuses existing methods
- How to safely handle objects that may be null

## Checkpoint

Your `searchByInstructorName` method should not crash if some courses do not have instructors yet.

## Submission

Submit:

1. Updated `CourseService.java`
2. GitHub commit link and/or screenshot
