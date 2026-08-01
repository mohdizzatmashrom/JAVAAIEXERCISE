# Day 7 Exercise 1: Install and Secure MongoDB

## Objective

Install MongoDB Community Edition, configure authentication, create the required users, and verify that your MongoDB server is ready for development.

---

## Prerequisites

Install the following software:

- MongoDB Community Server
- MongoDB Compass
- MongoDB Shell (`mongosh`)

---

## Task 1 — Install MongoDB

Install MongoDB on your computer.

Verify that:

- The MongoDB service is running.
- You can connect to the local server using MongoDB Compass.
- You can connect using `mongosh`.

---

## Task 2 — Create a Root Administrator

Using MongoDB Shell:

- Switch to the `admin` database.
- Create a root administrator account.
- Verify that the administrator account was created successfully.

---

## Task 3 — Enable Authentication

Configure MongoDB so that authentication is required.

After enabling authentication:

- Restart MongoDB.
- Verify that anonymous connections are no longer allowed.
- Log in successfully using the administrator account you created.

---

## Task 4 — Create the Application Database

Create a database named:

```text
support_desk_db
```

Inside this database:

- Create an application user.
- Grant only the permissions required for the application to read and write data.
- Verify that the application user can successfully log in.

---

## Task 5 — Create Sample Data

Inside `support_desk_db`:

- Create a `tickets` collection.
- Insert at least one ticket document.
- Verify that the document was saved successfully.

The document should contain fields such as:

- title
- description
- category
- priority
- status
- createdBy
- createdAt

Use your own sample values.

---

## Task 6 — Verify Using MongoDB Compass

Connect to MongoDB Compass using the application user.

Verify that:

- `support_desk_db` exists.
- `tickets` exists.
- Your sample document is visible.

---

## Submission

Submit screenshots showing:

1. MongoDB running successfully.
2. Successful login using the administrator account.
3. Successful login using the application account.
4. MongoDB Compass connected successfully.
5. The `support_desk_db` database.
6. The `tickets` collection.
7. At least one ticket document.

---

## Reflection Questions

1. What is the purpose of the `admin` database?

2. Why should an application use its own database user instead of the root administrator?

3. What is the difference between authentication and authorization?

4. What would happen if authentication was disabled on a production database?
