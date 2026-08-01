# Day 5 Final Exercise: Add Booking Endpoints to the Mock API

## Objective

In this exercise, you will extend the existing mock API by adding simple booking endpoints.

Earlier today, you learned about:

* REST resources
* HTTP methods
* status codes
* JSON request bodies
* JSON response bodies
* validation errors
* frontend and backend communication

Now you will write backend code inside the mock API to support event bookings.

---

## Scenario

The mock API already has event data.

A user should be able to create a booking for an event.

You will add a new resource:

```text
bookings
```

A booking represents a user reserving seats for an event.

---

## Existing Event Data

The mock API already has events similar to this:

```javascript
let events = [
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
    }
];
```

You should use this event data when creating a booking.

---

## Your Task

Modify `mock-api.js`.

Add support for the following endpoints:

| Method | Endpoint             | Purpose              |
| ------ | -------------------- | -------------------- |
| GET    | `/api/bookings`      | View all bookings    |
| GET    | `/api/bookings/{id}` | View one booking     |
| POST   | `/api/bookings`      | Create a new booking |

---

## Booking Data Structure

Each booking should have the following fields:

```javascript
{
    id: "BK001",
        eventId: "EV001",
        participantName: "Rahim Gonzalez",
        participantEmail: "rahim@example.com",
        seats: 2,
        status: "CONFIRMED"
}
```

---

## Part A: Create a Bookings Array

Add a new empty array near the top of `mock-api.js`.

```javascript
let bookings = [];
```

This will store the bookings while the server is running.

The data does not need to be saved permanently. If you restart the server, the array will become empty again.

---

## Part B: Create Validation Logic

Create a validation function for booking requests.

The API should reject a booking if:

1. `eventId` is missing
2. `participantName` is missing
3. `participantEmail` is missing
4. `seats` is not a whole number greater than 0

The function should return an array of errors.

Example error format:

```javascript
{
    field: "seats",
        message: "Seats must be a whole number greater than 0"
}
```

You may name the function:

```javascript
validateBooking
```

---

## Part C: Add GET All Bookings

Add an endpoint that returns all bookings.

Request:

```http
GET http://localhost:8081/api/bookings
```

Expected successful status:

```text
200 OK
```

Expected response:

```json
[
  {
    "id": "BK001",
    "eventId": "EV001",
    "participantName": "Rahim Gonzalez",
    "participantEmail": "rahim@example.com",
    "seats": 2,
    "status": "CONFIRMED"
  }
]
```

If there are no bookings yet, the API should return an empty array:

```json
[]
```

---

## Part D: Add GET One Booking

Add an endpoint that returns one booking by ID.

Request example:

```http
GET http://localhost:8081/api/bookings/BK001
```

If the booking exists, return:

```text
200 OK
```

If the booking does not exist, return:

```text
404 Not Found
```

Example error response:

```json
{
  "message": "Booking BK999 was not found"
}
```

---

## Part E: Add POST Create Booking

Add an endpoint that creates a new booking.

Request:

```http
POST http://localhost:8081/api/bookings
Content-Type: application/json

{
  "eventId": "EV001",
  "participantName": "Rahim Gonzalez",
  "participantEmail": "rahim@example.com",
  "seats": 2
}
```

If the request is valid, the API should create a new booking and return:

```text
201 Created
```

Example response:

```json
{
  "id": "BK001",
  "eventId": "EV001",
  "participantName": "Rahim Gonzalez",
  "participantEmail": "rahim@example.com",
  "seats": 2,
  "status": "CONFIRMED"
}
```

---

## Part F: Check Whether the Event Exists

When creating a booking, the API should check whether the `eventId` matches an existing event.

For example, this should fail:

```json
{
  "eventId": "EV999",
  "participantName": "Rahim Gonzalez",
  "participantEmail": "rahim@example.com",
  "seats": 2
}
```

Expected status:

```text
404 Not Found
```

Example response:

```json
{
  "message": "Event EV999 was not found"
}
```

---

## Part G: Check Available Seats

The API should reject the booking if the requested number of seats is more than the event’s available seats.

For example, if an event has only 35 available seats, this should fail:

```json
{
  "eventId": "EV002",
  "participantName": "Rahim Gonzalez",
  "participantEmail": "rahim@example.com",
  "seats": 100
}
```

Expected status:

```text
400 Bad Request
```

Example response:

```json
{
  "message": "Not enough seats available"
}
```

---

## Part H: Reduce Available Seats After Booking

After a successful booking, reduce the event’s available seats.

Example:

Before booking:

```json
{
  "id": "EV001",
  "availableSeats": 120
}
```

Booking request:

```json
{
  "eventId": "EV001",
  "seats": 2
}
```

After successful booking:

```json
{
  "id": "EV001",
  "availableSeats": 118
}
```

You can test this by calling:

```http
GET http://localhost:8081/api/events
```

after creating a booking.

---

## Part I: Test Your API

Create or update your `.http` file with tests for:

1. Get all bookings
2. Create a valid booking
3. Get one booking
4. Create a booking with missing fields
5. Create a booking with an invalid event ID
6. Create a booking with too many seats

You should be able to explain the status code returned for each test.

---

## Minimum Completion Requirements

Your submission is complete when:

* `GET /api/bookings` works
* `GET /api/bookings/{id}` works
* `POST /api/bookings` works
* Invalid booking data returns `400`
* Unknown event ID returns `404`
* Successful booking returns `201`
* Available seats reduce after a successful booking

---

## Optional Task: DELETE Endpoint

Add this endpoint:

```http
DELETE /api/bookings/{id}
```

The endpoint should cancel a booking.

When a booking is cancelled:

1. The booking status should change to `"CANCELLED"`
2. The seats should be added back to the related event
3. The API should return the updated booking

Example response:

```json
{
  "id": "BK001",
  "eventId": "EV001",
  "participantName": "Rahim Gonzalez",
  "participantEmail": "rahim@example.com",
  "seats": 2,
  "status": "CANCELLED"
}
```

Do not physically remove the booking from the array.

---

## Submission

Submit:

1. Your updated `mock-api.js`
2. Optional: Your `.http` test file
3. A short note explaining which endpoints you completed

---

## Reminder

This is still a mock API.

The purpose is to practise REST API logic before building similar endpoints with Spring Boot.
