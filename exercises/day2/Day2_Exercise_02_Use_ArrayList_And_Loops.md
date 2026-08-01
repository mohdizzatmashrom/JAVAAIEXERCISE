# Day 2 Exercise 02 - Use ArrayList and Loops

## Goal

Yesterday, you created single objects.

Today, you will manage multiple objects using `ArrayList`.

## Import required

At the top of `Main.java`, add:

```java
import java.util.ArrayList;
```

## Tasks

### Task 1 - Create course list

Create:

```java
ArrayList<Course> courses = new ArrayList<>();
```

Add at least three courses.

Example:

```java
courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner"));
courses.add(new Course("C002", "React Frontend Development", 21, "Intermediate"));
courses.add(new Course("C003", "MongoDB Basics", 14, "Beginner"));
```

### Task 2 - Create instructor list

Create:

```java
ArrayList<Instructor> instructors = new ArrayList<>();
```

Add at least two instructors.

### Task 3 - Create student list

Create:

```java
ArrayList<Student> students = new ArrayList<>();
```

Add at least three students.

### Task 4 - Create course offering list

Create:

```java
ArrayList<CourseOffering> offerings = new ArrayList<>();
```

Add at least two course offerings.

### Task 5 - Print all records using loops

Use enhanced `for` loops.

Example:

```java
for (Course course : courses) {
    course.printSummary();
}
```

Do the same for:

- instructors
- students
- course offerings

## Important

Do not use update, delete, or advanced filter yet.

This Exercise is only about:

```text
ArrayList
add
for loop
printing objects
```

## Submission

Submit:

1. Updated `Main.java`
2. Screenshot showing all lists printed
3. GitHub commit link or screenshot
