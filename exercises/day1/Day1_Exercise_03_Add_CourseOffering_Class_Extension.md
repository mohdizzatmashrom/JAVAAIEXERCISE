# Day 1 Exercise 04 - Add a CourseOffering Class

## Learning Goal

Practise creating a new Java class and linking it to existing classes.

This exercise also introduces a useful full-stack modelling idea:

```text
Course = the general course template
CourseOffering = one scheduled run of that course
```

Example:

```text
Course: Java Fundamentals
Course Offering: Java Fundamentals - June 2026 Intake
```

This will help later when the course demo grows into a Spring Boot, MongoDB, and React application.

## New File to Create

Create:

```text
CourseOffering.java
```

## Required Fields

A course offering should have:

```java
private String offeringId;
private String offeringName;
private Course course;
private Instructor instructor;
private String startDate;
private String endDate;
private int capacity;
```

## Required Methods

Add the following:

1. Constructor.
2. Getter methods.
3. `printOfferingSummary()` method.

## Suggested Method Output

Your `printOfferingSummary()` method should print something similar to this:

```text
Offering ID: OFF001
Offering Name: Java Fundamentals - June 2026 Intake
Course: Java Fundamentals
Instructor: Aina Rahman
Start Date: 2026-06-19
End Date: 2026-06-20
Capacity: 25
```

## Main.java Task

In `Main.java`, create at least two course offerings.

Example:

```java
Course javaCourse = new Course("C001", "Java Fundamentals", 2, "Beginner");
Instructor instructor = new Instructor("I001", "Aina Rahman", "Java and Spring Boot");

CourseOffering offering = new CourseOffering(
        "OFF001",
        "Java Fundamentals - June 2026 Intake",
        javaCourse,
        instructor,
        "2026-06-19",
        "2026-06-20",
        25
);

offering.printOfferingSummary();
```

You may change the names and sample data.

## Core Requirements

Your program must:

1. Create at least two `Course` objects.
2. Create at least two `Instructor` objects.
3. Create at least two `CourseOffering` objects.
4. Print the summary of each course offering.
5. Run without errors.
6. Be committed to GitHub.

## Extension Task

Add one extra field to `CourseOffering`, such as:

```java
private String deliveryMode;
```

Example values:

```text
Physical
Online
Hybrid
```

Update your constructor, getter method, and `printOfferingSummary()` method.

## Question: Write your answer in `README.md`:



```text
Why is CourseOffering more useful than using only Course when building a real web application?
```

## Submission Evidence

Submit:

1. `CourseOffering.java` code.
2. GitHub commit screenshot.
3. README answer to the thinking question.
4. Short note explaining how AI helped you, if you used AI.

## Completion Checklist

Before submitting, check:

- [ ] `CourseOffering.java` exists.
- [ ] The class has all required fields.
- [ ] Constructor is working.
- [ ] Getter methods are included.
- [ ] `printOfferingSummary()` works.
- [ ] `Main.java` creates at least two course offerings.
- [ ] Program runs successfully.
- [ ] Code has been committed and pushed to GitHub.
- [ ] README reflection is completed.
