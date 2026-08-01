# Day 2 Exercise 03.6 - Update and Delete Courses

## Goal

Complete the main CRUD operations in `CourseService`.

At this stage, your service should be able to:

```text
Create
Read
Update
Delete
Search
Filter
Assign instructor
```

## Starting Point

Your `CourseService` should already support:

```java
createCourse(Course course)
getCourseById(String courseId)
getAllCourses()
searchByTitle(String keyword)
filterByLevel(String level)
assignInstructor(String courseId, Instructor instructor)
searchByInstructorName(String instructorName)
```

## Methods to Add

Add these methods:

```java
public Course updateDuration(String courseId, int newDurationHours)
```

```java
public void deleteCourse(String courseId)
```

## Behaviour

### updateDuration

The method should:

1. Find the course by ID
2. Check that the new duration is greater than zero
3. Update the course duration
4. Save the updated course
5. Return the updated course

If the new duration is zero or less, throw:

```java
InvalidCourseException
```

### deleteCourse

The method should:

1. Check whether the course exists
2. If the course does not exist, throw `CourseNotFoundException`
3. Delete the course using the repository

## Main Task

Update `CourseServiceDemo.java`.

Test:

1. Create at least three courses
2. Update the duration of one course
3. Delete one course
4. Print all remaining courses
5. Try to find the deleted course
6. Try to update a course with invalid duration

## Suggested Flow

```text
=== Update Duration ===
C001 duration updated to 20 hours

=== Delete Course ===
C003 deleted successfully

=== Remaining Courses ===
C001 - Java Fundamentals
C002 - React Frontend Development

=== Find Deleted Course ===
Course not found error: Course not found: C003

=== Invalid Duration Test ===
Validation error: Course duration must be greater than zero.
```

## Learning Focus

By completing this exercise, you should understand:

- How to update existing data
- How to delete existing data
- How CRUD operations map to service methods
- Why service methods should validate before changing data
- How exceptions protect the application from invalid operations

## Checkpoint

The deleted course should no longer appear in `getAllCourses()`.

The invalid duration should not be saved.

## Submission

Submit:

1. Completed `CourseService.java`
2. Completed `CourseServiceDemo.java`
3. Screenshot of update output
4. Screenshot of delete output
5. Screenshot of exception output
6. GitHub commit link and/or screenshot
