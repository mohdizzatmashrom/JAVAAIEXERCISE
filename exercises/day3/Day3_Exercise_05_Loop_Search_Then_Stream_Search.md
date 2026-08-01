# Day 3 Exercise 05 - Write Search Using Loop, Then Compare with Stream

## Why you are doing this

Some students said that `stream()`, `filter()`, `map()`, and `toList()` still feel unclear.

That is normal.

A stream is easier to understand after you first write the normal loop version.

This Exercise focuses on this idea:

```text
Loop version first
Stream version second
```

## What you will write

You will add one new search method to `CourseService` using a normal loop.

Then, as an optional extension, you can write the same method using stream.

## File to edit

Edit:

```text
src/main/java/com/fullstack/demo/service/CourseService.java
```

## Task A - Add required import

If your file does not already have it, add:

```java
import java.util.ArrayList;
```

`CourseService` should already have:

```java
import java.util.List;
```

## Task B - Write this method using a normal loop

Add this method inside `CourseService`:

```java
public List<Course> searchByLevelUsingLoop(String level)
```

Requirements:

1. If `level` is `null`, treat it as an empty string.
2. Trim the level.
3. Use `equalsIgnoreCase()` for comparison.
4. Create an empty `ArrayList<Course>`.
5. Loop through `courseRepository.findAll()`.
6. Add matching courses to the results list.
7. Return the results list.

## Suggested structure

Do not copy this blindly. Complete the missing parts yourself.

```java
public List<Course> searchByLevelUsingLoop(String level) {
    String safeLevel = level == null ? "" : level.trim();

    List<Course> results = new ArrayList<>();

    for (Course course : courseRepository.findAll()) {
        // check if course level matches safeLevel
        // if yes, add course to results
    }

    return results;
}
```

## Task C - Test your method in a demo class

Create:

```text
src/main/java/com/fullstack/demo/SearchPractice.java
```

In this demo class:

1. Create `CourseRepository` and `CourseService`.
2. Add at least four courses:

```text
C001 - Java Fundamentals - Beginner
C002 - React Frontend Development - Intermediate
C003 - MongoDB Basics - Beginner
C004 - Spring Boot API Development - Intermediate
```

3. Call:

```java
List<Course> beginnerCourses = courseService.searchByLevelUsingLoop("Beginner");
```

4. Print the matching courses using a loop.

## Expected output

Your output should show only Beginner courses:

```text
=== Beginner Courses ===
C001 - Java Fundamentals
C003 - MongoDB Basics
```

The exact format can be different.

## Optional Task D - Write the stream version

After the loop version works, add:

```java
public List<Course> searchByLevelUsingStream(String level)
```

Use:

```text
stream()
filter()
toList()
```

Then test it in the same demo class.

## Optional Task E - Add search by duration

For stronger students:

```java
public List<Course> searchByMinimumDurationUsingLoop(int minimumHours)
```

Example:

```text
Return all courses with durationHours >= minimumHours
```

## Common mistakes to avoid

Do not start with streams if you cannot explain the loop version.

Do not compare strings using `==`:

```java
course.getLevel() == safeLevel
```

Use:

```java
course.getLevel().equalsIgnoreCase(safeLevel)
```

## Submission checklist

- [ ] `searchByLevelUsingLoop()` is added to `CourseService`.
- [ ] The method uses `ArrayList`.
- [ ] The method uses a normal `for` loop.
- [ ] The method handles `null` safely.
- [ ] The demo class creates at least four courses.
- [ ] The demo class prints only matching courses.
- [ ] Code compiles and runs.

## README reflection

Answer:

```text
Which version is easier to understand: loop or stream? Why?
```

Then answer:

```text
What does filter() do in a stream?
```
