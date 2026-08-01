# Day 3 Exercise 02 - Interface and Repository Storage Practice

## Why you are doing this

Some students asked why we created:

```text
CourseRepository.java
InMemoryCourseRepository.java
```

instead of just one repository class.

This Exercise helps you see the difference between:

```text
Interface       = what actions are available
Implementation = how those actions actually work today
```

For now, data is stored temporarily in memory using `LinkedHashMap`. Later, MongoDB will be the real storage.

## What you will write

You will create a demo class that uses the repository directly so you can see where data is stored before the service layer uses it.

## File to create

Create:

```text
src/main/java/com/fullstack/demo/RepositoryPractice.java
```

Use this package:

```java
package com.fullstack.demo;
```

## Imports you will need

```java
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;

import java.util.List;
import java.util.Optional;
```

## Task A - Create the repository using the interface type

Write:

```java
CourseRepository courseRepository = new InMemoryCourseRepository();
```

Add a comment above it explaining this line:

```text
The variable type is CourseRepository, but the actual object is InMemoryCourseRepository.
```

## Task B - Save three courses directly through the repository

Use `courseRepository.save(...)` to save these courses:

```text
C005 - API Documentation - 7 hours - Beginner
C006 - Java Collections Practice - 12 hours - Beginner
C007 - Clean Code Basics - 8 hours - Intermediate
```

Example pattern:

```java
Course apiCourse = new Course("C005", "API Documentation", 7, "Beginner");
courseRepository.save(apiCourse);
```

## Task C - Print all courses

Use:

```java
List<Course> courses = courseRepository.findAll();
```

Then loop through the list:

```java
for (Course course : courses) {
    course.printSummary();
}
```

## Task D - Find one course using Optional

Use:

```java
Optional<Course> optionalCourse = courseRepository.findById("C006");
```

Then write an `if` statement:

```java
if (optionalCourse.isPresent()) {
    Course foundCourse = optionalCourse.get();
    foundCourse.printSummary();
} else {
    System.out.println("Course not found.");
}
```

## Task E - Check if a course exists

Use:

```java
courseRepository.existsById("C007")
```

Print a message such as:

```text
C007 exists: true
```

## Expected output

Your output should show:

```text
=== All Courses ===
C005...
C006...
C007...

=== Find C006 ===
C006 details...

=== Exists Check ===
C007 exists: true
```

## Common mistakes to avoid

Do not change `CourseRepository` into a class.

Keep this:

```java
public interface CourseRepository
```

Do not write storage code inside the interface. The storage code belongs in:

```text
InMemoryCourseRepository.java
```

## Submission checklist

- [ ] `RepositoryPractice.java` exists.
- [ ] You used `CourseRepository courseRepository = new InMemoryCourseRepository();`.
- [ ] You saved at least three courses through the repository.
- [ ] You printed all courses using a loop.
- [ ] You used `Optional<Course>` when finding by ID.
- [ ] You used `existsById()`.
- [ ] Code compiles and runs.

## README reflection

Answer:

```text
Why is InMemoryCourseRepository temporary storage?
What would probably replace it later when we use MongoDB?
```
