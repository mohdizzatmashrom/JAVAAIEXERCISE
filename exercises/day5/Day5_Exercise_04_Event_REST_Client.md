# Day 5 Exercise 4: Build an Event API Client

## Objective

In this exercise, you will build a small JavaScript frontend that consumes a REST API.

You have already designed REST endpoints for an event booking system. Now you will build a simple client that calls an existing Event API and displays the results on a webpage.

---

## Scenario

An event booking system allows users to view available events.

Your task is to build the frontend logic for loading and displaying events.

The backend API has already been prepared for you.

---

## API Endpoint

Use the following endpoint:

GET http://localhost:8081/api/events

---

## Starter Files

You are given:

- `index.html`
- `app.js`

You should only write your code in `app.js`.

Do not edit the mock API file.

---

## Requirements

Your application must:

1. Send a GET request to load all events.
2. Display each event in the list.
3. Show the event title, date, venue, and available seats.
4. Show a status message while data is loading.
5. Show a success message after the events are loaded.
6. Show an error message if the request fails.

---

## Display Format

Each event should be displayed in a readable format.

Example output:

Tech Career Fair - 2026-08-10 - Kuala Lumpur Convention Centre - 120 seats available

---

## Restrictions

Do not use `alert()`.

Do not hardcode the event list in JavaScript.

Do not copy the trainer’s course offering code line by line. The API resource, field names, and display output are different.

---

## Challenge Task

After displaying all events, add a button or input that allows the user to search for one event by ID.

Example endpoint:

GET http://localhost:8081/api/events/EV001

Your page should display the selected event if it exists, or show a useful message if it does not exist.

---

## Submission

Submit your completed `app.js` file.