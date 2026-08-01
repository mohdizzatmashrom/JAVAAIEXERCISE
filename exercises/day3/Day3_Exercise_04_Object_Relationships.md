# Day 3 Exercise 04 - Object Relationships and Composition

## Why you are doing this

Students often ask when to use composition and when to use inheritance.

For this course demo, composition is more important.

Composition means:

```text
One object has another object.
```

Examples from our project:

```text
Course has an Instructor
CourseOffering has a Course
CourseOffering has an Instructor
```

This Exercise makes you write those relationships in code.

## What you will write

You will create a demo class that creates instructors, courses, and course offerings, then links the objects together.

## File to create

Create:

```text
src/main/java/com/fullstack/demo/ObjectRelationshipPractice.java
```

## Imports you will need

```java
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;
```

## Task A - Create two instructors

Create two instructors:

```text
I001 - Mike Rahman - Java and Spring Boot
I002 - Marcus Lee - React and Frontend Development
```

## Task B - Create two courses

Create two courses:

```text
C001 - Java Fundamentals - 14 hours - Beginner
C002 - React Frontend Development - 21 hours - Intermediate
```

## Task C - Assign instructors to courses

Use:

```java
course.setInstructor(instructor);
```

Assign:

```text
Mike Rahman -> Java Fundamentals
Marcus Lee -> React Frontend Development
```

Then print both course summaries.

## Task D - Create two course offerings

Create two `CourseOffering` objects.

Example values:

```text
OFF001 - Java Fundamentals June Intake
Course: Java Fundamentals
Instructor: Mike Rahman
Start Date: 2026-06-29
End Date: 2026-06-30
Capacity: 25
Delivery Mode: Physical
```

```text
OFF002 - React Frontend July Intake
Course: React Frontend Development
Instructor: Marcus Lee
Start Date: 2026-07-01
End Date: 2026-07-03
Capacity: 20
Delivery Mode: Hybrid
```

## Task E - Print the course offerings

Use:

```java
offering.printSummary();
```

for both offerings.

## Task F - Add comments explaining composition

Above your `CourseOffering` creation code, add a comment explaining:

```text
CourseOffering uses composition because it has a Course and has an Instructor.
```

## Expected output

Your output should show:

```text
=== Courses ===
Java Fundamentals with Mike Rahman
React Frontend Development with Marcus Lee

=== Course Offerings ===
OFF001...
OFF002...
```

## Extension task

Create a third course offering that reuses the same course but uses a different date.

Example:

```text
OFF003 - Java Fundamentals July Weekend Intake
```

This shows why `Course` and `CourseOffering` are not the same thing.

## Common mistakes to avoid

Do not create a course offering using only text fields for course and instructor.

Less useful:

```java
private String courseTitle;
private String instructorName;
```

Better:

```java
private Course course;
private Instructor instructor;
```

## Submission checklist

- [ ] You created two instructors.
- [ ] You created two courses.
- [ ] You assigned instructors to courses.
- [ ] You created two course offerings.
- [ ] You printed all course offerings.
- [ ] Your code comments explain composition.
- [ ] Code compiles and runs.

## README reflection

Answer:

```text
Why is CourseOffering a better design than putting start date, end date, and capacity directly inside Course?
```
