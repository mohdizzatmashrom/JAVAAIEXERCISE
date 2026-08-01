# Day 4 Exercise 05 - Render Student Cards in HTML

## Your Task

Create a folder:

```text
student-dom-rendering
```

Inside it, create:

```text
index.html
script.js
```

## HTML Requirements

Your `index.html` must have:

```text
Page title
Heading: Student List
A div with id="student-list"
script.js linked at the bottom
```

## JavaScript Requirements

In `script.js`, create an array of at least 4 students.

Each student must have:

```text
studentId
studentName
email
status
```

Then:

1. Select the `student-list` div using `document.getElementById`.
2. Loop through the students using `forEach`.
3. Create a card for each student using `document.createElement`.
4. Use `innerHTML` to place student details inside the card.
5. Use `appendChild` to add the card to the page.

## Card Must Show

```text
Student ID
Name
Email
Status
```

## Important Rule

The instructor rendered courses. You must render students.

## Submission

Submit:

1. `student-dom-rendering/index.html`
2. `student-dom-rendering/script.js`
3. Screenshot of browser output
4. GitHub commit link or screenshot

## README Reflection

Answer:

```text
What does the DOM allow JavaScript to do?
```
