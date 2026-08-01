# Day 5 Exercise 3: Display Event JSON on a Webpage

## Objective

In this exercise, you will practise turning JavaScript data into visible content on a webpage.

This prepares you for the next activity, where the same type of data will come from a REST API instead of being written directly inside your JavaScript file.

---

## Scenario

You are building a simple event preview page.

The event data is already provided as a JavaScript array. Your task is to display all events on the webpage using JavaScript.

---

## What You Will Practise

By completing this exercise, you will practise:

1. Selecting HTML elements using JavaScript.
2. Reading data from a JavaScript array.
3. Creating HTML elements dynamically.
4. Displaying object properties on a webpage.
5. Updating a status message.

---

## Starter Files

Create a folder for this exercise.

Inside the folder, create these two files:

```text
index.html
app.js
```

---

## Starter HTML

Use this code in `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Preview</title>
</head>
<body>
  <h1>Event Preview</h1>

  <p id="statusText">Events not displayed yet.</p>

  <ul id="eventList"></ul>

  <script src="app.js"></script>
</body>
</html>
```

---

## Starter JavaScript

Use this code in `app.js`:

```javascript
const events = [
  {
    id: "EV001",
    title: "Tech Career Fair",
    date: "2026-08-10",
    venue: "Kuala Lumpur Convention Centre",
    availableSeats: 120
  },
  {
    id: "EV002",
    title: "Web Development Bootcamp",
    date: "2026-08-15",
    venue: "Digital Learning Hub",
    availableSeats: 35
  },
  {
    id: "EV003",
    title: "AI for Business Workshop",
    date: "2026-08-20",
    venue: "Innovation Centre",
    availableSeats: 50
  }
];

// Write your code below this line
```

---

## Requirements

Write JavaScript code that does the following:

1. Select the event list element from the HTML.
2. Select the status text element from the HTML.
3. Display every event inside the unordered list.
4. Each event must show:
   - title
   - date
   - venue
   - available seats
5. Update the status text after the events are displayed.

---

## Expected Page Output

Your page should display the events in a readable format similar to this:

```text
Tech Career Fair - 2026-08-10 - Kuala Lumpur Convention Centre - 120 seats available
Web Development Bootcamp - 2026-08-15 - Digital Learning Hub - 35 seats available
AI for Business Workshop - 2026-08-20 - Innovation Centre - 50 seats available
```

The status text should also change from:

```text
Events not displayed yet.
```

to something meaningful, such as:

```text
3 event(s) displayed.
```

---

## Restrictions

You must not manually write the event items inside `index.html`.

You must not use `alert()`.

You must use JavaScript to create and display the list items.

---

## Challenge Task

After displaying the events, update the output so that events with fewer than 50 available seats show the text:

```text
Limited seats
```

Example:

```text
Web Development Bootcamp - 2026-08-15 - Digital Learning Hub - 35 seats available - Limited seats
```

---

## Submission

Submit your completed `app.js` file.

