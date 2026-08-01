# Day 4 Exercise 06 - Add Search to the Student List


## Starting Point

Continue from:

```text
student-dom-rendering
```

You may copy it into a new folder:

```text
student-search-ui
```

## HTML Requirements

Add:

```text
input with id="search-input"
button with id="search-button"
button with id="reset-button"
div with id="student-list"
```

## JavaScript Requirements

Create a function:

```javascript
function renderStudents(studentArray) {
  // clear student-list
  // show "No students found" if array is empty
  // otherwise render student cards
}
```

Add click behaviour:

### Search Button

When the search button is clicked:

1. Read the input value.
2. Convert it to lowercase.
3. Use `filter` to search student names.
4. Render the filtered students.

### Reset Button

When the reset button is clicked:

1. Clear the input.
2. Render all students again.

## Search Requirement

Search must work by student name.

Example:

```text
Search: ignacio
Result: Ignacio de Paul
```

## Important Rule

Do not search courses. The instructor already did that. Your UI must search students.

## Submission

Submit:

1. `student-search-ui/index.html`
2. `student-search-ui/script.js`
3. Screenshot before search
4. Screenshot after search
5. GitHub commit link or screenshot

## README Reflection

Answer:

```text
How is JavaScript filter used in a search feature?
```
