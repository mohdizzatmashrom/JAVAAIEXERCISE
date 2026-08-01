# Day 4 Exercise 07 - Load Students from a JSON File Using Fetch

Today, you will load data from:

```javascript
fetch("students.json")
```

Later, when we connect to Spring Boot, the idea will be similar:

```javascript
fetch("http://localhost:8080/api/students")
```

So this exercise prepares you for connecting JavaScript or React to a backend API later.

---

# What is async?

In this exercise, you will create an `async` function.

Example:

```javascript
async function loadStudents() {
  // loading code here
}
```

`async` means:

```text
This function contains code that may take time to finish.
```

For example, loading data from a JSON file does not happen instantly.

JavaScript needs to:

```text
1. Request the file
2. Wait for the file to respond
3. Convert the JSON data into JavaScript objects
4. Display the data on the page
```

Because this process takes time, we use `async`.

---

# What is await?

Inside an `async` function, we can use `await`.

Example:

```javascript
const response = await fetch("students.json");
```

`await` means:

```text
Wait for this task to finish before moving to the next line.
```

In this exercise, you will use:

```javascript
const response = await fetch("students.json");
const students = await response.json();
```

This means:

```text
1. Wait for students.json to load.
2. Wait for the JSON data to be converted into JavaScript objects.
3. Store the converted data in the students variable.
```

Without `await`, JavaScript may continue running before the data is ready.

---

# What is fetch?

`fetch` is used to request data.

In this exercise:

```javascript
fetch("students.json")
```

means:

```text
Request data from the students.json file.
```

Later in the course:

```javascript
fetch("http://localhost:8080/api/students")
```

will mean:

```text
Request student data from the Spring Boot backend API.
```

For now, remember:

```text
async = this function is allowed to wait
await = wait for a task to finish
fetch = request data from a file or API
```

---

# What is try/catch?

When loading data, something can go wrong.

For example:

```text
students.json file is missing
file name is typed wrongly
JSON format is invalid
Live Server is not running
```

So we use `try/catch`.

Example:

```javascript
try {
  // try to load the data
} catch (error) {
  // run this if something goes wrong
}
```

This prevents the page from failing silently.

It allows us to show a useful error message to the user.

---

# Your Task

Create a folder:

```text
student-fetch-json
```

Inside it, create these 3 files:

```text
index.html
script.js
students.json
```

Your folder should look like this:

```text
student-fetch-json
├── index.html
├── script.js
└── students.json
```

---

# students.json Requirements

Create at least 4 student records.

Each student record must have:

```text
studentId
studentName
email
status
```

Example:

```json
[
  {
    "studentId": "S001",
    "studentName": "Ignacio de Paul",
    "email": "ignacio@example.com",
    "status": "Active"
  },
  {
    "studentId": "S002",
    "studentName": "Ben Tan",
    "email": "ben@example.com",
    "status": "Inactive"
  }
]
```

Important JSON rules:

```text
Use double quotes for keys and string values.
Do not use trailing commas.
The file must start with [ and end with ].
Each object must be separated by a comma.
```

---

# HTML Requirements

In `index.html`, create a basic HTML page.

Your page must include:

```text
Heading: Fetch Student Data
p with id="status-message"
div with id="student-list"
script.js linked at the bottom
```

Your HTML should include this structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Student Data</title>
</head>
<body>
    <h1>Fetch Student Data</h1>

    <p id="status-message">Loading students...</p>

    <div id="student-list"></div>

    <script src="script.js"></script>
</body>
</html>
```

---

# JavaScript Requirements

In `script.js`, complete the following tasks.

---

## 1. Select the HTML elements

Select:

```text
status-message
student-list
```

Example:

```javascript
const statusMessage = document.getElementById("status-message");
const studentList = document.getElementById("student-list");
```

---

## 2. Create renderStudents(students)

Create a function called:

```javascript
renderStudents(students)
```

This function should:

```text
Clear the student-list area
Loop through the students array
Create a student card for each student
Display studentId, studentName, email, and status
Append each card to the page
```

Example card content:

```text
Student ID: S001
Name: Ignacio de Paul
Email: ignacio@example.com
Status: Active
```

---

## 3. Create async function loadStudents()

Create an async function:

```javascript
async function loadStudents() {
  // code here
}
```

Inside this function, use:

```text
try/catch
fetch("students.json")
await response.json()
renderStudents(students)
```

---

## 4. Show a loading message

Before fetching the data, show:

```text
Loading students...
```

Example:

```javascript
statusMessage.textContent = "Loading students...";
```

---

## 5. Fetch students.json

Use:

```javascript
const response = await fetch("students.json");
```

Then check if the response is okay:

```javascript
if (!response.ok) {
  throw new Error("Failed to load student data.");
}
```

---

## 6. Convert JSON into JavaScript objects

Use:

```javascript
const students = await response.json();
```

This converts the JSON data into a JavaScript array of student objects.

---

## 7. Render the students

After the data is loaded successfully:

```javascript
statusMessage.textContent = "";
renderStudents(students);
```

---

## 8. Handle errors

If loading fails, show an error message:

```javascript
catch (error) {
  statusMessage.textContent = "Error: " + error.message;
}
```

---

## 9. Call the function

At the bottom of the file, call:

```javascript
loadStudents();
```

If you forget this line, the data will not load.

---

# Important Rule

Run this using **Live Server**.

Do not double-click the HTML file directly.

If you double-click the HTML file, `fetch("students.json")` may not work properly because the browser may block file loading.

Use:

```text
Right-click index.html
Open with Live Server
```

---

# Testing Checklist

Before submitting, check that:

```text
students.json has at least 4 students
index.html opens in browser using Live Server
Loading message appears briefly
Student cards appear on the page
No error appears in the browser console
script.js is linked correctly
students.json file name matches the fetch path exactly
```

---

# Common Mistakes to Avoid

## Mistake 1: Wrong file name

This will fail:

```javascript
fetch("student.json")
```

If your file is named:

```text
students.json
```

The file name must match exactly.

---

## Mistake 2: Invalid JSON

This is invalid JSON:

```json
[
  {
    studentId: "S001",
    studentName: "Ignacio de Paul",
  }
]
```

Correct JSON:

```json
[
  {
    "studentId": "S001",
    "studentName": "Ignacio de Paul"
  }
]
```

---

## Mistake 3: Forgetting await

This is incomplete:

```javascript
const response = fetch("students.json");
```

Use:

```javascript
const response = await fetch("students.json");
```

---

## Mistake 4: Forgetting to call the function

If you create:

```javascript
async function loadStudents() {
  // code here
}
```

but forget:

```javascript
loadStudents();
```

then nothing will happen.

---

# Example Output

Your browser page should show something like:

```text
Fetch Student Data

Ignacio de Paul
Student ID: S001
Email: ignacio@example.com
Status: Active

Ben Tan
Student ID: S002
Email: ben@example.com
Status: Inactive

Chong Mei
Student ID: S003
Email: mei@example.com
Status: Active
```

---

# Submission

Submit:

1. `student-fetch-json/index.html`
2. `student-fetch-json/script.js`
3. `student-fetch-json/students.json`
4. Screenshot of browser output
5. GitHub commit link or screenshot

---

# README Reflection

Answer the following questions:

```text
1. What does async mean?
2. What does await do?
3. What does fetch do?
4. Why do we use fetch before connecting to a real backend API?
5. Why should this exercise be run using Live Server?
```
