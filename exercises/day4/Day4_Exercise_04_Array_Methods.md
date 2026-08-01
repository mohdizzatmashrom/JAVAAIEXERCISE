# Day 4 Exercise 04 - Practise JavaScript Array Methods

## What You Just Learned

The instructor showed several common JavaScript array methods using course data.

In this exercise, you will practise **8 JavaScript array methods** using student data:

```text
forEach
filter
find
map
push
pop
shift
unshift
```

Some of these methods are used to **read or transform** an array.

Some of these methods are used to **modify** the original array.

---

## Learning Objective

By the end of this exercise, you should be able to:

1. Loop through an array using `forEach`.
2. Filter records using `filter`.
3. Find one record using `find`.
4. Transform array data using `map`.
5. Add items to the end of an array using `push`.
6. Remove items from the end of an array using `pop`.
7. Remove items from the beginning of an array using `shift`.
8. Add items to the beginning of an array using `unshift`.

---

## Your Task

Create a file:

```text
student-array-methods.js
```

Inside the file, create the following array:

```javascript
const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" }
];
```

Then complete all 8 coding tasks below.

---

# Part A - Methods That Read or Create a New Array

These methods do **not directly change** the original array:

```text
forEach
filter
find
map
```

---

## 1. forEach

Use `forEach` to print all student names.

Example:

```javascript
students.forEach((student) => {
  console.log(student.studentName);
});
```

Expected section title:

```text
=== All Student Names ===
```

---

## 2. filter

Use `filter` to create a new array containing only students whose status is `"Active"`.

Store the result in a variable called:

```javascript
activeStudents
```

Example output section title:

```text
=== Active Students ===
```

---

## 3. find

Use `find` to find the student with ID:

```text
S002
```

Store the result in a variable called:

```javascript
foundStudent
```

Example output section title:

```text
=== Find Student S002 ===
```

---

## 4. map

Use `map` to create a new array containing only student email addresses.

Store the result in a variable called:

```javascript
studentEmails
```

Example output section title:

```text
=== Student Emails ===
```

---

# Part B - Methods That Modify the Original Array

These methods **change the original array**:

```text
push
pop
shift
unshift
```

For this section, print the array after each operation so you can see how the data changes.

---

## 5. push

Use `push` to add one new student to the **end** of the array.

Add this student:

```javascript
{
  studentId: "S004",
  studentName: "Danish Nawaz",
  email: "danish@example.com",
  status: "Active"
}
```

Store the return value of `push` in a variable called:

```javascript
newLengthAfterPush
```

Then print:

```text
=== After push ===
```

Also print the new length.

---

## 6. pop

Use `pop` to remove the **last student** from the array.

Store the removed student in a variable called:

```javascript
removedLastStudent
```

Then print:

```text
=== After pop ===
```

Also print:

```text
Removed last student:
```

---

## 7. unshift

Use `unshift` to add one new student to the **beginning** of the array.

Add this student:

```javascript
{
  studentId: "S000",
  studentName: "Ignacio de Paul",
  email: "ignacio@example.com",
  status: "Active"
}
```

Store the return value of `unshift` in a variable called:

```javascript
newLengthAfterUnshift
```

Then print:

```text
=== After unshift ===
```

Also print the new length.

---

## 8. shift

Use `shift` to remove the **first student** from the array.

Store the removed student in a variable called:

```javascript
removedFirstStudent
```

Then print:

```text
=== After shift ===
```

Also print:

```text
Removed first student:
```

---

# Example Output

Your output does not need to look exactly the same, but it should contain all these sections:

```text
=== Original Students ===
[ ... ]

=== All Student Names ===
Ignacio de Paul
Ben Tan
Chong Mei

=== Active Students ===
[ ... ]

=== Find Student S002 ===
{ studentId: 'S002', studentName: 'Ben Tan', ... }

=== Student Emails ===
[ 'ignacio@example.com', 'ben@example.com', 'mei@example.com' ]

=== After push ===
[ ... ]
New length after push: 4

=== After pop ===
[ ... ]
Removed last student:
{ studentId: 'S004', studentName: 'Danish Nawaz', ... }

=== After unshift ===
[ ... ]
New length after unshift: 4

=== After shift ===
[ ... ]
Removed first student:
{ studentId: 'S000', studentName: 'Ignacio de Paul', ... }

=== Final Students Array ===
[ ... ]
```

---

# Important Rules

1. You must use all 8 required array methods:

```text
forEach
filter
find
map
push
pop
shift
unshift
```

2. Do not use a `for...of` loop for this exercise.

3. Do not simply print the array without using the required method.

4. Use clear `console.log()` section titles so your output is easy to read.

5. Make sure your file runs without errors using Node.js.

---

# Helpful Reminder

## Methods that do not directly change the original array

```text
forEach
filter
find
map
```

## Methods that change the original array

```text
push
pop
shift
unshift
```

## Return values

| Method    | What it does               | What it returns           |
| --------- | -------------------------- | ------------------------- |
| `forEach` | Runs code for each item    | `undefined`               |
| `filter`  | Keeps matching items       | New array                 |
| `find`    | Finds first matching item  | One object or `undefined` |
| `map`     | Transforms each item       | New array                 |
| `push`    | Adds item to the end       | New array length          |
| `pop`     | Removes last item          | Removed item              |
| `shift`   | Removes first item         | Removed item              |
| `unshift` | Adds item to the beginning | New array length          |

---

# Submission

Submit:

1. `student-array-methods.js`
2. Screenshot of terminal output
3. GitHub commit link or screenshot

---

# README Reflection

Answer the following questions in your README:

```text
1. What is the difference between filter, find, and map?
2. Which four array methods change the original array?
3. What does push return?
4. What does pop return?
5. What is the difference between shift and unshift?
```
