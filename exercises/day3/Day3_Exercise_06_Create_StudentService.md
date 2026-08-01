# Day 3 Exercise 06 - Build StudentService Using the Same Pattern as CourseService

## Why you are doing this

The best way to understand the service/repository structure is to build it again for another model.

You already have this pattern:

```text
Course
CourseRepository
InMemoryCourseRepository
CourseService
CourseNotFoundException
```

Now you will create the same pattern for `Student`.

This is not about memorising code. It is about recognising the structure.

## What you will write

You will create:

```text
StudentRepository
InMemoryStudentRepository
StudentService
StudentNotFoundException
StudentServicePractice
```

## Existing file you will use

You already have:

```text
src/main/java/com/fullstack/demo/model/Student.java
```

Use that model. Do not create a second `Student` class.

---

# Part 1 - Create StudentRepository

## File to create

```text
src/main/java/com/fullstack/demo/repository/StudentRepository.java
```

## What to write

Create an interface with these methods:

```java
Student save(Student student);
Optional<Student> findById(String studentId);
List<Student> findAll();
boolean existsById(String studentId);
```

## Imports needed

```java
import com.fullstack.demo.model.Student;

import java.util.List;
import java.util.Optional;
```

## Checkpoint

At this point, `StudentRepository` should not contain any `ArrayList`, `LinkedHashMap`, or storage logic.

The interface only says what actions are available.

---

# Part 2 - Create InMemoryStudentRepository

## File to create

```text
src/main/java/com/fullstack/demo/repository/InMemoryStudentRepository.java
```

## What to write

Create a class that implements `StudentRepository`.

Use this field:

```java
private final Map<String, Student> students = new LinkedHashMap<>();
```

Then implement:

```java
save()
findById()
findAll()
existsById()
```

## Hints

For `save()`:

```java
students.put(student.getStudentId(), student);
return student;
```

For `findById()`:

```java
return Optional.ofNullable(students.get(studentId));
```

For `findAll()`:

```java
return new ArrayList<>(students.values());
```

---

# Part 3 - Create StudentNotFoundException

## File to create

```text
src/main/java/com/fullstack/demo/exception/StudentNotFoundException.java
```

## What to write

Create a custom exception that extends `RuntimeException`.

Message example:

```text
Student not found with ID: S999
```

---

# Part 4 - Create StudentService

## File to create

```text
src/main/java/com/fullstack/demo/service/StudentService.java
```

## Required field

```java
private final StudentRepository studentRepository;
```

## Constructor

The constructor should receive `StudentRepository`:

```java
public StudentService(StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
}
```

## Methods to write

### 1. registerStudent

```java
public Student registerStudent(Student student)
```

Requirements:

1. Student cannot be null.
2. Student ID cannot already exist.
3. Save student using repository.
4. Return saved student.

For now, if duplicate exists, you may throw:

```java
new IllegalArgumentException("Student already exists: " + student.getStudentId())
```

### 2. getStudentById

```java
public Student getStudentById(String studentId)
```

Use:

```java
studentRepository.findById(studentId)
        .orElseThrow(() -> new StudentNotFoundException(studentId));
```

### 3. getAllStudents

```java
public List<Student> getAllStudents()
```

Return all students from repository.

### 4. searchByNameUsingLoop

```java
public List<Student> searchByNameUsingLoop(String keyword)
```

Requirements:

1. If keyword is null, use empty string.
2. Convert keyword to lowercase.
3. Create `ArrayList<Student>`.
4. Loop through all students.
5. If student name contains keyword, add to results.
6. Return results.

---

# Part 5 - Create a demo class

## File to create

```text
src/main/java/com/fullstack/demo/Day3_Exercise06_StudentServicePractice.java
```

## Demo requirements

Your demo class must:

1. Create `StudentRepository` and `StudentService`.
2. Register at least 3 students.
3. Print all students.
4. Find one student by ID.
5. Search students by name.
6. Try to find a missing student ID.
7. Catch `StudentNotFoundException` and print a friendly message.

## Suggested student data

```text
S001 - Roberto Chan - roberto@example.com
S002 - Priya Nair - priya@example.com
S003 - Lee Salazae - lee@example.com
```

## Expected output

Your output should include sections like:

```text
=== Register Students ===
=== All Students ===
=== Find Student By ID ===
=== Search Student By Name ===
=== Missing Student Test ===
Student not found with ID: S999
```

## Extension task for faster students

Add:

```text
DuplicateStudentException
searchByNameUsingStream(String keyword)
```

Then update `registerStudent()` to throw `DuplicateStudentException` instead of `IllegalArgumentException`.

## Common mistakes to avoid

Do not store students inside `StudentService`.

Avoid this:

```java
private List<Student> students = new ArrayList<>();
```

Storage belongs in:

```text
InMemoryStudentRepository
```

The service should use the repository.

## Submission checklist

- [ ] `StudentRepository.java` created.
- [ ] `InMemoryStudentRepository.java` created.
- [ ] `StudentNotFoundException.java` created.
- [ ] `StudentService.java` created.
- [ ] Demo class created.
- [ ] At least 3 students are registered.
- [ ] `getStudentById()` works for existing student.
- [ ] Missing student is handled using exception.
- [ ] Search by name works using loop.
- [ ] Code compiles and runs.

## README reflection

Answer:

```text
How is StudentService similar to CourseService?
```

Then answer:

```text
Which file stores students temporarily while the program is running?
```
